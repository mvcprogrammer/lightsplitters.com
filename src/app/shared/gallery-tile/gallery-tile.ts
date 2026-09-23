import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Photo } from '../models';
import { ResponsiveImage } from '../responsive-image/responsive-image';

/** Clickable photo tile; emits `opened` so a parent can show the lightbox. */
@Component({
  selector: 'ls-gallery-tile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResponsiveImage],
  template: `
    <button type="button" [attr.aria-label]="'View larger: ' + (photo().caption ?? photo().alt)" (click)="opened.emit()">
      <ls-responsive-image [photo]="photo()" [basePath]="basePath()" [sizes]="sizes()" />
    </button>
  `,
  styles: `
    :host { display: block; }
    button { display: block; width: 100%; height: 100%; padding: 0; margin: 0; border: 0; cursor: zoom-in;
      overflow: hidden; background: var(--ls-placeholder); }
    ls-responsive-image { width: 100%; height: 100%; transition: transform .5s var(--ls-ease); }
    button:hover ls-responsive-image { transform: scale(1.03); }
  `,
})
export class GalleryTile {
  readonly photo = input.required<Photo>();
  readonly basePath = input('/images/');
  readonly sizes = input('(max-width: 767px) 50vw, 33vw');
  readonly opened = output<void>();
}
