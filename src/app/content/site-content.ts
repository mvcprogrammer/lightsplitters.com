import { ServiceOffering, WeddingPackage } from '@shared/models';
import { PHOTOS } from './photos';

/**
 * All copy that isn't known yet stays as a [PLACEHOLDER]. Search the project
 * for "[" to find every one before launch.
 */
export const BUSINESS = {
  /** Brand is "Media", not "Photography" — video and other services will be added later. */
  name: 'LightSplitters Media',
  shortName: 'LightSplitters',
  tagline: 'Media',
  domain: 'lightsplitters.com',
  city: 'Tampa Bay',
  // No public email: inquiries go through the contact form (Lambda + SES, recipient set in the Lambda's env).
  phone: '(727) 331-3340',
  responseTime: '4 hours',
};

export const SERVICES: ServiceOffering[] = [
  {
    id: 'weddings',
    title: 'Weddings',
    blurb: 'Full-day storytelling, from getting ready to the last dance — with an optional couple website.',
    includes: [
      'Engagement session',
      '8 hours of coverage',
      'Private online gallery',
      'Couple website at yourname.lightsplitters.com',
    ],
    startingAt: '$499',
    cta: { label: 'View wedding packages', link: '/weddings' },
    blurbLink: { text: 'couple website', href: 'https://sample.lightsplitters.com' },
    quietCta: { label: 'See a sample couple website', href: 'https://sample.lightsplitters.com' },
    photo: PHOTOS.brideMirror,
    pitch: [
      'You will remember the vows. You won\'t remember the way your dad looked at you during them, or the flower girl asleep under table nine. That is what we are there for: the whole day, quietly, from the first button to the last song.',
      'Afterward, one private gallery for both families and print-ready files you actually own. Add a couple website at your own address and your guests have one link for the schedule, the directions and, after the day, the photos.',
    ],
  },
  {
    id: 'portraits',
    title: 'Portraits',
    blurb: 'Headshots, families and individuals in the studio — and patient, treat-powered sessions for their pets.',
    includes: [
      'Individual & headshot sessions',
      'Family & group sessions',
      'Pets, solo or with their people',
      'Retouched, print-ready selects',
    ],
    startingAt: '$24.99',
    cta: { label: 'Book a portrait session', link: '/portraits' },
    photo: PHOTOS.chef,
    pitch: [
      'Phone photos are fine until you need the real one: the headshot for the new job, the family portrait for the wall, the one picture of the dog that actually looks like him. Studio light, a patient photographer and a little direction change everything.',
      'Sessions are unhurried, kids and pets welcome. You leave with retouched, print-ready selects, and prints or framing if you want them, so the good one ends up somewhere better than a camera roll.',
    ],
  },
  {
    id: 'digitizing',
    title: 'Photo Digitizing',
    blurb: 'Bring us the family albums and shoeboxes. We scan them and give everyone a private online album.',
    includes: [
      'Albums and loose prints scanned',
      'Scans straightened and color-corrected',
      'Private family album at yourname.lightsplitters.com',
      'Everyone can view, download and add photos',
      'Optional AI restoration to perfect condition, $1.25 per photo',
    ],
    startingAt: '$0.25 per photo',
    cta: { label: 'Start a digitizing project', link: '/digitizing' },
    photo: PHOTOS.familyPrint,
    pitch: [
      'That shoebox in the closet is the only copy. One move, one leak, one fading print at a time, and the faces of your grandparents are gone for good. A scan can\'t fade, tear or get lost.',
      'Then the whole family gets one private album. Your sister downloads the wedding photo at full size, your cousin adds the ones from her attic, and nobody has to mail an envelope or squint at a screenshot. Every print, in one place, for everyone who loves them.',
    ],
  },
  {
    id: 'prints',
    title: 'Prints & Framing',
    blurb: 'Archival prints, framed or unframed, from your session or your own files.',
    includes: [
      'Fine-art paper & canvas',
      'Custom framing options',
      'Order from your gallery',
      'Shipping or local pickup',
    ],
    startingAt: '$1.99',
    cta: { label: 'See print options', link: '/prints' },
    photo: PHOTOS.twoCavaliers,
    framed: true,
  },
];

export const WEDDING_PACKAGES: WeddingPackage[] = [
  {
    id: 'essentials',
    name: 'Essentials',
    tag: 'Intimate days',
    price: '$499',
    includes: ['8 hours of coverage', 'One photographer', 'Private online gallery', 'Print release'],
    photo: PHOTOS.vows,
  },
  {
    id: 'signature',
    name: 'Signature',
    tag: 'Recommended',
    price: '$699',
    includes: ['10 hours of coverage', 'Two photographers', 'Engagement session', 'Private online gallery'],
    photo: PHOTOS.goldenHour,
    recommended: true,
  },
  {
    id: 'heirloom',
    name: 'Heirloom',
    tag: 'The full story',
    price: '$999',
    includes: ['Full-day coverage', 'Two photographers', 'Engagement session', 'Heirloom album & framed print'],
    photo: PHOTOS.receptionDance,
  },
];

/** Photo digitizing page: how it works + the family album that comes with it. */
export const DIGITIZING = {
  /** Per-photo pricing. The first tier is what the service card shows as "starting at". */
  pricing: [
    { name: 'Scan', price: '$0.25', per: 'per photo', text: 'Scanned at high resolution, straightened and color-corrected.' },
    {
      name: 'Scan + AI restoration',
      price: '$1.25',
      per: 'per photo',
      text: 'Tears, creases, stains and fading repaired — the photo refreshed to perfect condition.',
    },
  ],
  steps: [
    {
      n: '01',
      title: 'Drop off the album',
      text: 'Bring the album, box or envelope of prints to the studio. Every original goes back to you untouched.',
    },
    {
      n: '02',
      title: 'We scan and tidy up',
      text: 'Each photo is scanned at high resolution, straightened and color-corrected, then named and put in order. Add AI restoration to any photo that needs repair.',
    },
    {
      n: '03',
      title: 'Your family album goes live',
      text: 'A private page at yourname.lightsplitters.com where everyone can browse, download full-size files and add their own photos.',
    },
  ],
  album: {
    features: [
      'Private address — only people with the link',
      'Full-size downloads of every photo',
      'Family members add their own photos',
      'Nothing to install; works on any phone',
    ],
    sampleUrl: 'https://sample-album.lightsplitters.com',
    sampleHost: 'sample-album.lightsplitters.com',
    sampleTitle: 'The Rivera Family',
    sampleSubtitle: 'Scanned from the family albums',
    samplePhoto: PHOTOS.familyPrint,
  },
};

export const COUPLE_SITE_ADDON = {
  label: 'Add a couple website',
  detail: 'yourname.lightsplitters.com',
  price: '$1,299',
};

/**
 * Stripe Payment Links for prints (v1 — no custom cart).
 * Create each link in the Stripe dashboard and paste its URL here.
 */
export const PRINT_OPTIONS = [
  { id: 'print-8x10', name: 'Fine-art print · 8×10', price: 'Call for price', paymentLink: '' },
  { id: 'print-11x14', name: 'Fine-art print · 11×14', price: 'Call for price', paymentLink: '' },
  { id: 'print-16x20', name: 'Fine-art print · 16×20', price: 'Call for price', paymentLink: '' },
  { id: 'framed-11x14', name: 'Framed print · 11×14', price: 'Call for price', paymentLink: '' },
  { id: 'framed-16x20', name: 'Framed print · 16×20', price: 'Call for price', paymentLink: '' },
];
