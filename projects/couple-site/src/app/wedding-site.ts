import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ResponsiveImage } from '@shared/responsive-image/responsive-image';
import { GalleryGrid } from '@shared/gallery-grid/gallery-grid';
import { CoupleSite } from './couple-site.model';
import { PhotoDrop } from './photo-drop';

/** Wedding website template — story, details, gallery and guest photo sharing. */
@Component({
  selector: 'ls-wedding-site',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResponsiveImage, GalleryGrid, PhotoDrop],
  templateUrl: './wedding-site.html',
  styleUrl: './wedding-site.scss',
})
export class WeddingSite {
  readonly site = input.required<CoupleSite>();
  /** Photos live beside site.json in the couple's own folder. */
  protected readonly photoBase = 'photos/';
}
