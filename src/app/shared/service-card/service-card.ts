import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ServiceOffering, splitBlurb } from '../models';
import { ResponsiveImage } from '../responsive-image/responsive-image';
import { CheckList } from '../check-list/check-list';

/**
 * Selectable service card.
 * Desktop: clicking selects it and the parent shows <ls-service-detail>.
 * Mobile (≤767px): the card becomes a tap-to-expand panel with the details inline.
 */
@Component({
  selector: 'ls-service-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResponsiveImage, CheckList, RouterLink],
  template: `
    <button
      type="button"
      class="face"
      [attr.aria-pressed]="selected()"
      [attr.aria-expanded]="selected()"
      [attr.aria-controls]="'svc-' + service().id"
      (click)="picked.emit(service().id)"
    >
      <div class="media">
        @if (service().framed) {
          <div class="wall">
            <div class="frame"><div class="mat">
              <ls-responsive-image class="framed-img" [photo]="service().photo" sizes="200px" />
            </div></div>
            <span class="note">Frame shown for illustration</span>
          </div>
        } @else {
          <ls-responsive-image class="fill" [photo]="service().photo" sizes="(max-width: 767px) 96px, 25vw" />
        }
      </div>
      <div class="body">
        <span class="title">{{ service().title }}</span>
        <span class="blurb">{{ service().blurb }}</span>
        <span class="hint">{{ selected() ? 'Selected' : 'View details' }} →</span>
      </div>
      <svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
    </button>

    <!-- Inline detail: only visible on mobile -->
    @if (selected()) {
      <div class="inline-detail" [id]="'svc-' + service().id">
        <p>{{ blurb().before }}@if (blurb().text) {<a [href]="service().blurbLink!.href" target="_blank" rel="noopener">{{ blurb().text }}</a>}{{ blurb().after }}</p>
        @for (p of service().pitch ?? []; track $index) {
          <p class="pitch">{{ p }}</p>
        }
        <ls-check-list [items]="service().includes" />
        <span class="price">Starting at <strong>{{ service().startingAt }}</strong></span>
        <a class="ls-btn ls-btn--line" [routerLink]="service().cta.link">{{ service().cta.label }}</a>
        @if (service().quietCta; as q) {
          <a class="quiet" [href]="q.href" target="_blank" rel="noopener">{{ q.label }} <span aria-hidden="true">↗</span></a>
        }
      </div>
    }
  `,
  styleUrl: './service-card.scss',
  host: { '[class.is-selected]': 'selected()' },
})
export class ServiceCard {
  readonly service = input.required<ServiceOffering>();
  protected readonly blurb = computed(() => splitBlurb(this.service().blurb, this.service().blurbLink));
  readonly selected = input(false);
  readonly picked = output<string>();
}
