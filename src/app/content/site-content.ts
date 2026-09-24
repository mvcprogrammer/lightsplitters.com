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
    blurb: 'Full-day storytelling, from getting ready to the last dance — with an optional couples website.',
    includes: [
      'Engagement session',
      '8 hours of coverage',
      'Private online gallery',
      'Couples website at yourname.lightsplitters.com',
    ],
    startingAt: '$499',
    cta: { label: 'View wedding packages', link: '/weddings' },
    blurbLink: { text: 'couples website', href: 'https://sample.lightsplitters.com' },
    quietCta: { label: 'See a sample couples website', href: 'https://sample.lightsplitters.com' },
    photo: PHOTOS.brideMirror,
    pitch: [
      'You will remember the vows. You won\'t remember the way your dad looked at you during them, or the flower girl asleep under table nine. That is what we are there for: the whole day, quietly, from the first button to the last song.',
      'Afterward, one private gallery for both families and print-ready files you actually own. Add a couples website at your own address and your guests have one link for the schedule, the directions and, after the day, the photos.',
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
    id: 'family-album',
    title: 'Family Album',
    blurb: 'One private online album for the whole family. Bring us the prints and shoeboxes; we photograph every print and put it where everyone can find it.',
    includes: [
      'Private family album at yourname.lightsplitters.com',
      'Everyone can view, download and share every photo',
      'Family members add the photos they\'ve kept',
      'Every print photographed, straightened and color-corrected',
      'Optional restoration to perfect condition, $1.25 per photo',
    ],
    startingAt: '$0.25 per photo',
    cta: { label: 'Start your family album', link: '/family-album' },
    photo: PHOTOS.familyPrint,
    pitch: [
      'Right now the family photos are scattered: a shoebox at your mother\'s, an album at your aunt\'s, and the one good picture of your grandparents that only your cousin has. Each is the only copy, and every year it fades a little more.',
      'A family album puts all of them in one private place. Your sister downloads the wedding photo at full size, your cousin adds the ones from her attic, and everyone shares a single link instead of mailing envelopes. We photograph the prints; your family gets the album.',
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

/** Family album page: the album itself, how the photos get into it, and per-photo pricing. */
export const FAMILY_ALBUM = {
  /** Shown beside the "how it works" steps: the copy stand each print goes under. */
  processPhoto: PHOTOS.copyStand,
  processCaption: 'Every print is photographed on the studio copy stand with a 61-megapixel camera and a 35mm G Master lens, under even light from both sides.',
  /** Per-photo pricing. The first tier is what the service card shows as "starting at". */
  pricing: [
    { name: 'Reproduction', price: '$0.25', per: 'per photo', text: 'Each print photographed at 61 megapixels, straightened and color-corrected.' },
    {
      name: 'Reproduction + Restoration',
      price: '$1.25',
      per: 'per photo',
      text: 'Tears, creases, stains and fading repaired — the photo refreshed to perfect condition.',
    },
  ],
  steps: [
    {
      n: '01',
      title: 'Bring us the photos',
      text: 'Drop off the albums, boxes or envelopes of prints at the studio. Every original goes back to you untouched.',
    },
    {
      n: '02',
      title: 'We photograph and tidy up',
      text: 'Each print goes under the camera on our copy stand, lit evenly from both sides and photographed at high resolution. Then it\'s straightened, color-corrected, named and put in order. Add restoration to any photo that needs repair.',
    },
    {
      n: '03',
      title: 'Your family album goes live',
      text: 'A private page at yourname.lightsplitters.com. Share the link and everyone can browse, download full-size files and add the photos they\'ve kept.',
    },
  ],
  album: {
    features: [
      'Private address — only people with the link',
      'Full-size downloads of every photo',
      'One link to share with the whole family',
      'Family members add their own photos',
      'Nothing to install; works on any phone',
    ],
    sampleUrl: 'https://sample-album.lightsplitters.com',
    sampleHost: 'sample-album.lightsplitters.com',
    sampleTitle: 'The Rivera Family',
    sampleSubtitle: 'From the family albums',
    samplePhoto: PHOTOS.familyPrint,
  },
};

export const COUPLE_SITE_ADDON = {
  label: 'Add a couples website',
  detail: 'yourname.lightsplitters.com',
  price: '$99.00',
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
