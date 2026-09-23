import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { PageIntro } from '@shared/page-intro/page-intro';
import { CheckList } from '@shared/check-list/check-list';
import { GalleryGrid } from '@shared/gallery-grid/gallery-grid';
import { ContactForm } from '@shared/contact-form/contact-form';
import { PhotoCategory } from '@shared/models';
import { SERVICES } from '../../content/site-content';
import { PORTFOLIO } from '../../content/photos';

/**
 * One template for simple service pages (Portraits today; future services such as video).
 * The route passes `serviceId`, `categories`, `headline` and `formService` as route data
 * (bound to inputs via withComponentInputBinding).
 */
@Component({
  selector: 'ls-service-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageIntro, CheckList, GalleryGrid, ContactForm],
  template: `
    @if (service(); as s) {
      <div class="ls-container">
        <ls-page-intro [eyebrow]="s.title" [lede]="s.blurb">{{ headline() }}</ls-page-intro>
        <div class="facts">
          <ls-check-list [items]="s.includes" />
          <div class="price">
            <span class="label">Starting at</span>
            <span class="amount">{{ s.startingAt }}</span>
          </div>
        </div>
      </div>
      <section class="ls-section">
        <div class="ls-container">
          <ls-gallery-grid [photos]="photos()" />
        </div>
      </section>
      <section class="ls-section ls-section--alt">
        <div class="ls-container contact">
          <h2>Book a {{ formService().toLowerCase() }}</h2>
          <ls-contact-form [service]="formService()" />
        </div>
      </section>
    }
  `,
  styles: `
    @use 'styles/tokens' as *;
    .facts { display: grid; grid-template-columns: 2fr 1fr; gap: 48px; padding: 36px 0 8px; border-top: 1px solid var(--ls-border); }
    .price { display: flex; flex-direction: column; gap: 10px; }
    .label { font-size: 13px; letter-spacing: .14em; text-transform: uppercase; color: var(--ls-muted); }
    .amount { font-family: var(--ls-font-display); font-size: 40px; line-height: 1; }
    .contact { display: grid; grid-template-columns: 1fr 1.4fr; gap: 64px; align-items: start; }
    h2 { font-size: clamp(34px, 4vw, 52px); }
    @include mobile { .facts, .contact { grid-template-columns: 1fr; gap: 28px; } }
  `,
})
export class ServicePage {
  readonly serviceId = input.required<string>();
  /** Which portfolio photos to show, e.g. ['portraits', 'pets']. */
  readonly categories = input.required<readonly PhotoCategory[]>();
  readonly headline = input('');
  readonly formService = input('Something else');

  protected readonly service = computed(() => SERVICES.find((s) => s.id === this.serviceId()));
  protected readonly photos = computed(() => PORTFOLIO.filter((p) => p.category && this.categories().includes(p.category)));
}
