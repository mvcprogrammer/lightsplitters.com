import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PageIntro } from '@shared/page-intro/page-intro';
import { ContactForm } from '@shared/contact-form/contact-form';
import { BUSINESS } from '../../content/site-content';

@Component({
  selector: 'ls-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageIntro, ContactForm],
  template: `
    <div class="ls-container">
      <ls-page-intro eyebrow="Get in touch"
        [lede]="'Tell us about your day, your family, your four-legged friend or that box of old photos. We reply within ' + biz.responseTime + '.'">
        Let's make something worth <em>framing.</em>
      </ls-page-intro>
      <div class="grid">
        <div class="lines">
          <span>{{ biz.phone }}</span>
          <span>{{ biz.city }}</span>
        </div>
        <ls-contact-form [service]="service() ?? 'Wedding'" [responseTime]="biz.responseTime" />
      </div>
    </div>
  `,
  styles: `
    @use 'styles/tokens' as *;
    .grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 64px; padding-bottom: var(--ls-section-y); }
    .lines { display: flex; flex-direction: column; gap: 8px; font-size: 16px; }
    @include mobile { .grid { grid-template-columns: 1fr; gap: 28px; } }
  `,
})
export class Contact {
  /** ?service=Wedding (from "Check my date" etc.) — bound via withComponentInputBinding. */
  readonly service = input<string | undefined>();
  protected readonly biz = BUSINESS;
}
