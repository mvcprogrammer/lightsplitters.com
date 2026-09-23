import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  input,
  output,
  viewChild,
} from '@angular/core';
import { Photo } from '../models';
import { ResponsiveImage } from '../responsive-image/responsive-image';

/**
 * Full-screen photo viewer built on native <dialog>
 * (gives Esc-to-close, focus trapping and a backdrop for free).
 */
@Component({
  selector: 'ls-lightbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResponsiveImage],
  template: `
    <dialog #dlg (close)="closed.emit()" (click)="onBackdrop($event)" aria-label="Photo viewer">
      @if (photo(); as p) {
        <figure>
          <ls-responsive-image class="img" [photo]="p" [basePath]="basePath()" sizes="100vw" [eager]="true" />
          <figcaption>
            <span class="cap">{{ p.caption ?? p.alt }}</span>
            <span class="nav">
              @if (downloadable()) {
                <a class="dl" [href]="downloadHref()" download>Download</a>
              }
              <button type="button" (click)="step.emit(-1)" aria-label="Previous photo">←</button>
              <button type="button" (click)="step.emit(1)" aria-label="Next photo">→</button>
              <button type="button" class="close" (click)="dlg.close()">Close</button>
            </span>
          </figcaption>
        </figure>
      }
    </dialog>
  `,
  styles: `
    dialog { width: 100vw; height: 100vh; max-width: none; max-height: none; margin: 0; padding: 32px; border: 0;
      background: rgba(20,19,17,.96); color: var(--ls-on-dark); }
    dialog::backdrop { background: transparent; }
    figure { margin: 0; height: 100%; display: flex; flex-direction: column; gap: 20px; align-items: center; justify-content: center; }
    .img { flex: 1 1 auto; width: 100%; max-height: calc(100vh - 140px); background: transparent; }
    .img ::ng-deep img { object-fit: contain; }
    figcaption { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; justify-content: center; }
    .cap { font-size: 12px; letter-spacing: .2em; text-transform: uppercase; color: var(--ls-accent-on-dark); }
    .nav { display: flex; gap: 10px; }
    button, .dl { min-width: 46px; height: 46px; padding: 0 18px; background: transparent; color: var(--ls-on-dark);
      border: 1px solid var(--ls-on-dark); font: inherit; font-size: 14px; cursor: pointer; }
    .dl { display: inline-flex; align-items: center; text-decoration: none; border-color: var(--ls-accent-on-dark); color: var(--ls-accent-on-dark); }
    button:hover, .dl:hover { background: var(--ls-on-dark); color: var(--ls-ink); }
  `,
  host: { '(document:keydown.arrowleft)': 'onArrow(-1)', '(document:keydown.arrowright)': 'onArrow(1)' },
})
export class Lightbox {
  readonly photo = input<Photo | null>(null);
  readonly basePath = input('/images/');
  /** Show a "Download" link to the full-size JPEG (family albums). */
  readonly downloadable = input(false);
  readonly closed = output<void>();

  protected readonly downloadHref = computed(() => `${this.basePath()}${this.photo()?.slug}-2400.jpg`);
  readonly step = output<1 | -1>();

  private readonly dlg = viewChild.required<ElementRef<HTMLDialogElement>>('dlg');

  constructor() {
    effect(() => {
      const el = this.dlg().nativeElement;
      if (this.photo() && !el.open) el.showModal();
      if (!this.photo() && el.open) el.close();
    });
  }

  protected onBackdrop(e: MouseEvent) {
    // Clicking the dark area (the dialog itself, not its content) closes it.
    if (e.target === this.dlg().nativeElement) this.dlg().nativeElement.close();
  }

  protected onArrow(dir: 1 | -1) {
    if (this.dlg().nativeElement.open) this.step.emit(dir);
  }
}
