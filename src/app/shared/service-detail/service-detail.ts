import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceOffering, splitBlurb } from '../models';
import { CheckList } from '../check-list/check-list';

/** Desktop detail panel for the selected service card (hidden on mobile, where cards expand inline). */
@Component({
  selector: 'ls-service-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckList, RouterLink],
  template: `
    <div class="col">
      <span class="ls-eyebrow">Selected</span>
      <span class="title">{{ service().title }}</span>
      <span class="blurb">{{ blurb().before }}@if (blurb().text) {<a [href]="service().blurbLink!.href" target="_blank" rel="noopener">{{ blurb().text }}</a>}{{ blurb().after }}</span>
      @for (p of service().pitch ?? []; track $index) {
        <p class="pitch">{{ p }}</p>
      }
    </div>
    <ls-check-list [items]="service().includes" />
    <div class="col cta">
      <span class="label">Starting at</span>
      <span class="price">{{ service().startingAt }}</span>
      <a class="ls-btn ls-btn--dark" [routerLink]="service().cta.link">{{ service().cta.label }}</a>
      @if (service().quietCta; as q) {
        <a class="quiet" [href]="q.href" target="_blank" rel="noopener">{{ q.label }} <span aria-hidden="true">↗</span></a>
      }
    </div>
  `,
  styles: `
    @use 'styles/tokens' as *;
    :host { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 48px; align-items: start;
      background: var(--ls-surface); border: 1px solid var(--ls-border); padding: 44px 48px; position: relative;
      animation: ls-detail-in .55s var(--ls-ease) both; }
    /* Brass rule sweeps across the top, then settles as a hairline. */
    :host::before { content: ''; position: absolute; top: -1px; left: 0; height: 2px; width: 100%;
      background: var(--ls-accent); transform-origin: left; animation: ls-detail-rule .9s var(--ls-ease) both; }
    @keyframes ls-detail-in { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
    @keyframes ls-detail-rule { 0% { transform: scaleX(0); opacity: 1; } 55% { transform: scaleX(1); opacity: 1; } 100% { transform: scaleX(1); opacity: .55; } }
    @media (prefers-reduced-motion: reduce) { :host, :host::before { animation: none; } :host::before { opacity: .55; } }
    .col { display: flex; flex-direction: column; gap: 12px; }
    .title { font-family: var(--ls-font-display); font-size: 44px; line-height: 1; }
    .blurb { font-size: 15px; color: var(--ls-muted); }
    .blurb a { color: var(--ls-accent); text-decoration: underline; text-underline-offset: 3px; }
    .blurb a:hover { color: var(--ls-accent-hover); }
    .quiet { font-size: 13px; color: var(--ls-muted); text-decoration: none; margin-top: -6px; }
    .quiet:hover { color: var(--ls-accent); }
    .pitch { margin: 0; font-size: 15px; line-height: 1.6; color: var(--ls-ink); }
    .pitch:first-of-type { margin-top: 6px; }
    .cta { gap: 18px; align-items: flex-start; }
    .label { font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--ls-muted); }
    .price { font-family: var(--ls-font-display); font-size: 40px; line-height: 1; }
    @include tablet-down { :host { grid-template-columns: 1fr 1fr; } .cta { grid-column: span 2; } }
    @include mobile { :host { display: none; } }
  `,
})
export class ServiceDetail {
  readonly service = input.required<ServiceOffering>();
  protected readonly blurb = computed(() => splitBlurb(this.service().blurb, this.service().blurbLink));
}
