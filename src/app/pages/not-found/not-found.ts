import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageIntro } from '@shared/page-intro/page-intro';

@Component({
  selector: 'ls-not-found',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PageIntro],
  template: `
    <div class="ls-container" style="padding-bottom: var(--ls-section-y)">
      <ls-page-intro eyebrow="404" lede="That page slipped out of frame.">Nothing to see here.</ls-page-intro>
      <a class="ls-btn ls-btn--dark" routerLink="/">Back to home</a>
    </div>
  `,
})
export class NotFound {}
