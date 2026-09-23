import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageIntro } from '@shared/page-intro/page-intro';
import { PrintSteps } from './print-steps';
import { PRINT_OPTIONS } from '../../content/site-content';

/**
 * Prints & framing. v1 uses Stripe Payment Links (no cart): each option's
 * `paymentLink` in site-content.ts opens Stripe Checkout. Options without a
 * link yet fall back to "Ask about this".
 */
@Component({
  selector: 'ls-prints',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PageIntro, PrintSteps],
  template: `
    <div class="ls-container">
      <ls-page-intro eyebrow="Prints & framing"
        lede="Archival prints, framed or unframed — from your session or your own files.">
        From screen to <em>wall.</em>
      </ls-page-intro>
    </div>
    <section class="ls-section ls-section--dark">
      <div class="ls-container"><ls-print-steps /></div>
    </section>
    <section class="ls-section">
      <div class="ls-container">
        <ul class="options">
          @for (o of options; track o.id) {
            <li>
              <span class="name">{{ o.name }}</span>
              <span class="price">{{ o.price }}</span>
              @if (o.paymentLink) {
                <a class="ls-btn ls-btn--dark" [href]="o.paymentLink" rel="noopener">Order</a>
              } @else {
                <a class="ls-btn ls-btn--line" routerLink="/contact" [queryParams]="{ service: 'Prints & framing' }">Ask about this</a>
              }
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: `
    @use 'styles/tokens' as *;
    .options { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--ls-border); }
    li { display: grid; grid-template-columns: 1fr auto auto; gap: 32px; align-items: center; padding: 22px 0;
      border-bottom: 1px solid var(--ls-border); }
    .name { font-family: var(--ls-font-display); font-size: 28px; }
    .price { font-size: 16px; color: var(--ls-muted); }
    @include mobile { li { grid-template-columns: 1fr auto; gap: 12px; } li .ls-btn { grid-column: span 2; } }
  `,
})
export class Prints {
  protected readonly options = PRINT_OPTIONS;
}
