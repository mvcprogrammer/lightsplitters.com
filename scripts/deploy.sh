#!/usr/bin/env bash
# Build and upload the main site and the couple-site template to S3, then invalidate CloudFront.
# Requires: AWS CLI v2 configured. Set these (or export them in your shell):
#   LS_BUCKET=lightsplitters-site   LS_DISTRIBUTION=E1234567890
set -euo pipefail
: "${LS_BUCKET:?Set LS_BUCKET}"
: "${LS_DISTRIBUTION:?Set LS_DISTRIBUTION}"
cd "$(dirname "$0")/.."

npx ng build lightsplitters-web
npx ng build couple-site

SITE=dist/lightsplitters-web/browser
TPL=dist/couple-site/browser
LONG="public,max-age=31536000,immutable"
SHORT="public,max-age=0,must-revalidate"

# Main site: hashed assets + images cache for a year, HTML always revalidates.
# (--delete never touches sites/, which lives beside the main site in the bucket.)
aws s3 sync "$SITE" "s3://$LS_BUCKET" --delete --exclude "*.html" --exclude "sites/*" --cache-control "$LONG"
aws s3 sync "$SITE" "s3://$LS_BUCKET" --delete --exclude "*" --include "*.html" --exclude "sites/*" --cache-control "$SHORT"

# Couple-site template (shared JS/CSS). Each couple's own folder only holds index.html, site.json, photos/.
aws s3 sync "$TPL" "s3://$LS_BUCKET/sites/_template" --delete --exclude "index.html" --cache-control "$LONG"
aws s3 cp "$TPL/index.html" "s3://$LS_BUCKET/sites/_template/index.html" --cache-control "$SHORT"
# Refresh index.html in every existing couple folder so they pick up the new template hashes.
for slug in $(aws s3 ls "s3://$LS_BUCKET/sites/" | awk '{print $2}' | tr -d '/' | grep -v '^_template$'); do
  aws s3 cp "$TPL/index.html" "s3://$LS_BUCKET/sites/$slug/index.html" --cache-control "$SHORT"
done

aws cloudfront create-invalidation --distribution-id "$LS_DISTRIBUTION" --paths "/*" >/dev/null
echo "Deployed."
