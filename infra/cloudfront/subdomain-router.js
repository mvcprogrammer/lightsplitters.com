// CloudFront Function (runtime: cloudfront-js-2.0), event type: viewer-request.
//
// lightsplitters.com / www.lightsplitters.com  → main site (prerendered Angular)
//   /weddings        → /weddings/index.html
// <slug>.lightsplitters.com                    → couple site or family album in /sites/<slug>/
//   /                → /sites/<slug>/index.html
//   /site.json       → /sites/<slug>/site.json
//   /photos/a.jpg    → /sites/<slug>/photos/a.jpg
//   /main-ABC.js     → /sites/_template/main-ABC.js   (shared couple-site build)

var APEX = 'lightsplitters.com';
var RESERVED = { www: 1, api: 1, mail: 1, admin: 1, display: 1, _template: 1 };
// Retired main-site paths → where they live now (Pets merged into Portraits, 2026-09).
var REDIRECTS = {
  '/pets': '/portraits', '/pets/': '/portraits',
  '/digitizing': '/family-album', '/digitizing/': '/family-album',
};

function handler(event) {
  var req = event.request;
  var host = (req.headers.host && req.headers.host.value || '').toLowerCase();
  var uri = req.uri;

  // www → apex (permanent)
  if (host === 'www.' + APEX) {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: { location: { value: 'https://' + APEX + uri } },
    };
  }

  // Main site
  if (host === APEX) {
    if (REDIRECTS[uri]) {
      return {
        statusCode: 301,
        statusDescription: 'Moved Permanently',
        headers: { location: { value: 'https://' + APEX + REDIRECTS[uri] } },
      };
    }
    if (uri.indexOf('/sites/') === 0) {
      // Point at a key that never exists so S3 errors and CloudFront serves /404/index.html with a real 404 status.
      req.uri = '/sites/_blocked_/index.html';
      return req;
    }
    if (uri.charAt(uri.length - 1) === '/') req.uri = uri + 'index.html';
    else if (uri.split('/').pop().indexOf('.') === -1) req.uri = uri + '/index.html';
    return req;
  }

  // Couple sites: <slug>.lightsplitters.com
  var suffix = '.' + APEX;
  if (host.slice(-suffix.length) !== suffix) return notFound();
  var slug = host.slice(0, -suffix.length);
  if (!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(slug) || RESERVED[slug]) return notFound();

  var file = uri.split('/').pop();
  if (uri === '/' || file.indexOf('.') === -1) {
    req.uri = '/sites/' + slug + '/index.html'; // SPA entry
  } else if (uri === '/site.json' || uri.indexOf('/photos/') === 0 || uri === '/index.html') {
    req.uri = '/sites/' + slug + uri; // couple-specific content
  } else {
    req.uri = '/sites/_template' + uri; // shared JS/CSS/favicon from the template build
  }
  return req;
}

function notFound() {
  return { statusCode: 404, statusDescription: 'Not Found' };
}
