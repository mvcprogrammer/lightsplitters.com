import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Photo } from '../models';

/**
 * <picture> with WebP + JPEG fallbacks at 1200/2400 px.
 * Expects files named `{basePath}{slug}-{1200|2400}.{webp|jpg}`.
 */
@Component({
  selector: 'ls-responsive-image',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <picture>
      <source type="image/webp" [attr.srcset]="webpSet()" [attr.sizes]="sizes()" />
      <img
        [src]="fallback()"
        [attr.srcset]="jpgSet()"
        [attr.sizes]="sizes()"
        [alt]="photo().alt"
        [style.object-position]="photo().focus ?? '50% 50%'"
        [attr.loading]="eager() ? 'eager' : 'lazy'"
        [attr.fetchpriority]="eager() ? 'high' : null"
        decoding="async"
      />
    </picture>
  `,
  styles: `
    :host { display: block; overflow: hidden; background: var(--ls-placeholder); }
    picture, img { display: block; width: 100%; height: 100%; }
    img { object-fit: cover; }
  `,
})
export class ResponsiveImage {
  readonly photo = input.required<Photo>();
  /** CSS sizes attribute — how wide the image renders at each breakpoint. */
  readonly sizes = input('(max-width: 767px) 100vw, 50vw');
  /** true for above-the-fold images (hero). */
  readonly eager = input(false);
  readonly basePath = input('/images/');

  private readonly base = computed(() => this.basePath() + this.photo().slug);
  protected readonly webpSet = computed(() => `${this.base()}-1200.webp 1200w, ${this.base()}-2400.webp 2400w`);
  protected readonly jpgSet = computed(() => `${this.base()}-1200.jpg 1200w, ${this.base()}-2400.jpg 2400w`);
  protected readonly fallback = computed(() => `${this.base()}-1200.jpg`);
}
