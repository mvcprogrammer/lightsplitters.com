import { Routes } from '@angular/router';

const brand = 'LightSplitters Media';

export const routes: Routes = [
  { path: '', title: `${brand} — Weddings, Portraits, Digitizing & Prints`, loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  { path: 'weddings', title: `Wedding Collections — ${brand}`, loadComponent: () => import('./pages/weddings/weddings').then((m) => m.Weddings) },
  {
    path: 'portraits',
    title: `Portraits — ${brand}`,
    loadComponent: () => import('./pages/service-page/service-page').then((m) => m.ServicePage),
    data: {
      serviceId: 'portraits',
      categories: ['portraits', 'pets'],
      headline: 'People and pets, in considered light.',
      formService: 'Portrait session',
    },
  },
  // Pets used to be its own service; it now lives under Portraits (CloudFront 301s /pets as well).
  { path: 'pets', redirectTo: 'portraits' },
  { path: 'digitizing', title: `Photo Digitizing — ${brand}`, loadComponent: () => import('./pages/digitizing/digitizing').then((m) => m.Digitizing) },
  // Future lines of business (e.g. video) = a SERVICES entry + a route like portraits above.
  { path: 'prints', title: `Prints & Framing — ${brand}`, loadComponent: () => import('./pages/prints/prints').then((m) => m.Prints) },
  { path: 'contact', title: `Contact — ${brand}`, loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact) },
  { path: '404', title: `Not found — ${brand}`, loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound) },
  { path: '**', redirectTo: '404' },
];
