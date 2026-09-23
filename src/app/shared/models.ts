/** A photo that exists as web-sized copies: `{basePath}{slug}-{1200|2400}.{webp|jpg}`. */
export interface Photo {
  slug: string;
  alt: string;
  /** Landscape or portrait — used to pick grid spans. */
  orientation: 'landscape' | 'portrait';
  /** CSS object-position for crops, e.g. '50% 30%'. */
  focus?: string;
  category?: PhotoCategory;
  /** Short label shown in the lightbox, e.g. 'Wedding · Vows'. */
  caption?: string;
}

/** Portfolio filter buckets. Pets stay filterable even though they're sold under Portraits. */
export type PhotoCategory = 'weddings' | 'portraits' | 'pets';

export interface ServiceOffering {
  /** Open-ended so new lines of business (e.g. 'video') can be added as data, no code change. */
  id: string;
  title: string;
  blurb: string;
  includes: string[];
  /** Placeholder until real prices exist, e.g. '[YOUR PRICE]'. */
  startingAt: string;
  cta: { label: string; link: string };
  photo: Photo;
  /** Render the photo inside an illustrative frame (prints card). */
  framed?: boolean;
  /** Optional sales copy shown when the card is selected — one paragraph per entry. */
  pitch?: string[];
  /** Turn a phrase of the blurb into an external link in the detail panels (opens a new tab). */
  blurbLink?: { text: string; href: string };
  /** Low-key secondary link under the main button, e.g. "See an example". */
  quietCta?: { label: string; href: string };
}

/** Split `blurb` around `link.text` so templates can wrap that phrase in an anchor. */
export function splitBlurb(blurb: string, link?: { text: string }): { before: string; text: string; after: string } {
  const i = link ? blurb.indexOf(link.text) : -1;
  if (i < 0 || !link) return { before: blurb, text: '', after: '' };
  return { before: blurb.slice(0, i), text: link.text, after: blurb.slice(i + link.text.length) };
}

export interface WeddingPackage {
  id: string;
  name: string;
  tag: string;
  price: string;
  includes: string[];
  photo: Photo;
  recommended?: boolean;
}
