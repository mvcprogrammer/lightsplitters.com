import { Photo } from '@shared/models';

/**
 * Everything client-specific lives in /site.json next to index.html in the
 * client's S3 folder (s3://BUCKET/sites/<slug>/site.json). One build of this
 * app serves every couple and every family album — only site.json and photos/ differ.
 * `kind` picks the template; a missing `kind` means a wedding site (older site.json files).
 */
export type ClientSite = CoupleSite | AlbumSite;

/** Uploads by guests or family (v2: S3 presigned URLs and upload-by-email). */
export interface Uploads {
  enabled: boolean;
  email?: string;
}

/** Wedding website at <slug>.lightsplitters.com. */
export interface CoupleSite {
  kind?: 'wedding';
  slug: string;
  names: string;
  date: string;
  venue: string;
  city: string;
  story: string;
  heroPhoto: Photo;
  storyPhoto?: Photo;
  events: { title: string; lines: string[] }[];
  gallery: Photo[];
  guestUploads: Uploads;
}

/** Family album at <slug>.lightsplitters.com — reproduced prints the family can view, download, share and add to. */
export interface AlbumSite {
  kind: 'album';
  slug: string;
  title: string;
  /** Letter-spaced line under the title, e.g. "From the family albums". */
  subtitle?: string;
  /** Short paragraph shown above the gallery. */
  intro?: string;
  coverPhoto?: Photo;
  gallery: Photo[];
  /** Show full-size download links in the viewer. */
  downloads: boolean;
  uploads: Uploads;
}
