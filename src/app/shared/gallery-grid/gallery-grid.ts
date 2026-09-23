import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { Photo, PhotoCategory } from '../models';
import { GalleryTile } from '../gallery-tile/gallery-tile';
import { Lightbox } from '../lightbox/lightbox';

interface Filter {
  id: PhotoCategory | 'all';
  label: string;
}

/**
 * Masonry-style grid (portraits span two rows) with optional category chips
 * and a lightbox. Used on the home page, service pages and couple sites.
 */
@Component({
  selector: 'ls-gallery-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GalleryTile, Lightbox],
  template: `
    @if (showFilters()) {
      <div class="chips" role="group" aria-label="Filter photos">
        @for (f of filters; track f.id) {
          <button type="button" class="chip" [attr.aria-pressed]="filter() === f.id" (click)="filter.set(f.id)">
            {{ f.label }}
          </button>
        }
      </div>
    }
    <div class="grid" [style.--cols]="columns()">
      @for (p of visible(); track p.slug; let i = $index) {
        <ls-gallery-tile
          [photo]="p"
          [basePath]="basePath()"
          [class.tall]="p.orientation === 'portrait'"
          (opened)="openIndex.set(i)"
        />
      }
    </div>
    <ls-lightbox [photo]="current()" [basePath]="basePath()" [downloadable]="downloadable()" (closed)="openIndex.set(-1)" (step)="step($event)" />
  `,
  styles: `
    @use 'styles/tokens' as *;
    :host { display: flex; flex-direction: column; gap: 28px; }
    .chips { display: flex; gap: 10px; flex-wrap: wrap; }
    .chip { min-height: 44px; padding: 0 22px; font: inherit; font-size: 14px; font-weight: 500; cursor: pointer;
      border: 1px solid var(--ls-border-strong); background: transparent; color: var(--ls-ink); transition: border-color .2s ease; }
    .chip:hover { border-color: var(--ls-ink); }
    .chip[aria-pressed='true'] { background: var(--ls-ink); color: var(--ls-on-dark); border-color: var(--ls-ink); }
    .grid { display: grid; grid-template-columns: repeat(var(--cols, 3), minmax(0, 1fr)); grid-auto-rows: 240px;
      grid-auto-flow: dense; gap: 16px; }
    .tall { grid-row: span 2; }
    @include tablet-down { .grid { grid-auto-rows: 200px; } }
    @include mobile { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-auto-rows: 150px; gap: 10px; } }
  `,
})
export class GalleryGrid {
  readonly photos = input.required<readonly Photo[]>();
  readonly showFilters = input(false);
  readonly columns = input(3);
  readonly basePath = input('/images/');
  /** Offer full-size downloads in the lightbox. */
  readonly downloadable = input(false);

  protected readonly filters: Filter[] = [
    { id: 'all', label: 'All' },
    { id: 'weddings', label: 'Weddings' },
    { id: 'portraits', label: 'Portraits' },
    { id: 'pets', label: 'Pets' },
  ];
  protected readonly filter = signal<Filter['id']>('all');
  protected readonly openIndex = signal(-1);

  protected readonly visible = computed(() => {
    const f = this.filter();
    return f === 'all' ? this.photos() : this.photos().filter((p) => p.category === f);
  });
  protected readonly current = computed(() => this.visible()[this.openIndex()] ?? null);

  protected step(dir: 1 | -1) {
    const n = this.visible().length;
    this.openIndex.update((i) => (i + dir + n) % n);
  }
}
