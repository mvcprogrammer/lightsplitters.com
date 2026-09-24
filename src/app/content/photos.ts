import { Photo } from '@shared/models';

/**
 * The approved portfolio selects. Web copies live in public/images/ and are
 * produced from "LightSplitters Photos/_web" by `npm run photos`.
 */
export const PHOTOS = {
  heroCoupleStone: {
    slug: 'wedding-hero-couple-stone',
    alt: 'Bride and groom seated on a stone ledge, her train spread across the rocks',
    orientation: 'landscape',
    focus: '50% 60%',
    category: 'weddings',
    caption: 'Wedding · Portraits',
  },
  brideMirror: {
    slug: 'wedding-bride-mirror',
    alt: 'Bride smiling at her reflection while getting ready',
    orientation: 'portrait',
    focus: '40% 30%',
    category: 'weddings',
    caption: 'Wedding · Getting ready',
  },
  vows: {
    slug: 'wedding-vows',
    alt: 'Couple holding hands during their vows',
    orientation: 'portrait',
    focus: '50% 28%',
    category: 'weddings',
    caption: 'Wedding · Vows',
  },
  goldenHour: {
    slug: 'wedding-golden-hour',
    alt: 'Newlyweds smiling together at golden hour',
    orientation: 'landscape',
    focus: '50% 40%',
    category: 'weddings',
    caption: 'Wedding · Golden hour',
  },
  receptionDance: {
    slug: 'wedding-reception-dance',
    alt: 'Guests dancing with ribbon wands at the reception',
    orientation: 'landscape',
    focus: '50% 40%',
    category: 'weddings',
    caption: 'Wedding · Reception',
  },
  engagementRing: {
    slug: 'engagement-ring',
    alt: 'Engagement portrait, her hands and ring resting on his chest',
    orientation: 'portrait',
    focus: '50% 35%',
    category: 'weddings',
    caption: 'Engagement · Studio',
  },
  pollera: {
    slug: 'portrait-pollera',
    alt: 'Studio portrait of a woman in a traditional pollera and beaded headdress',
    orientation: 'portrait',
    focus: '50% 20%',
    category: 'portraits',
    caption: 'Studio · Portrait',
  },
  chef: {
    slug: 'portrait-chef',
    alt: 'Studio headshot of a chef in whites on a black background',
    orientation: 'portrait',
    focus: '50% 28%',
    category: 'portraits',
    caption: 'Studio · Headshot',
  },
  vintage: {
    slug: 'portrait-vintage',
    alt: 'Vintage-styled portrait of a woman looking over her shoulder',
    orientation: 'portrait',
    focus: '50% 45%',
    category: 'portraits',
    caption: 'Studio · Vintage',
  },
  twoCavaliers: {
    slug: 'pet-two-cavaliers',
    alt: 'Two Cavalier King Charles spaniels on a teal backdrop',
    orientation: 'landscape',
    focus: '40% 50%',
    category: 'pets',
    caption: 'Pets · Studio',
  },
  puppy: {
    slug: 'pet-puppy-closeup',
    alt: 'Cavalier puppy close-up on a coral backdrop',
    orientation: 'landscape',
    focus: '42% 40%',
    category: 'pets',
    caption: 'Pets · Puppy',
  },
  autumnCavalier: {
    slug: 'pet-autumn-cavalier',
    alt: 'Cavalier spaniel sitting among autumn leaves',
    orientation: 'portrait',
    focus: '50% 78%',
    category: 'pets',
    caption: 'Pets · On location',
  },
  familyPrint: {
    slug: 'digitizing-family-print',
    alt: 'Old black-and-white family print: a couple on a sofa holding a baby and a toddler, corners worn',
    orientation: 'landscape',
    focus: '50% 40%',
    caption: 'Family Album · Family print',
  },
  /** Not in the portfolio (no category): illustrates how prints are reproduced on the Family Album page. */
  copyStand: {
    slug: 'family-album-copy-stand',
    alt: 'The studio copy stand: a camera mounted overhead with a monitor, two small lights either side and a stack of family prints on the table below',
    orientation: 'landscape',
    focus: '50% 55%',
    caption: 'Family Album · The copy stand',
  },
} satisfies Record<string, Photo>;

/** Portfolio order — tuned so the 3-column dense grid packs without gaps. */
export const PORTFOLIO: Photo[] = [
  PHOTOS.vows,
  PHOTOS.pollera,
  PHOTOS.twoCavaliers,
  PHOTOS.vintage,
  PHOTOS.puppy,
  PHOTOS.chef,
  PHOTOS.engagementRing,
  PHOTOS.autumnCavalier,
  PHOTOS.brideMirror,
  PHOTOS.receptionDance,
  PHOTOS.goldenHour,
];
