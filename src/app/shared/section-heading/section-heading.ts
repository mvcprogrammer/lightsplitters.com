import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Eyebrow + headline + optional aside. Project the headline text (can include <em>):
 * <ls-section-heading eyebrow="Portfolio">Recent work</ls-section-heading>
 */
@Component({
  selector: 'ls-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="main">
      <span class="ls-eyebrow">{{ eyebrow() }}</span>
      <h2><ng-content /></h2>
    </div>
    <div class="aside"><ng-content select="[aside]" /></div>
  `,
  styles: `
    @use 'styles/tokens' as *;
    :host { display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; flex-wrap: wrap; }
    .main { display: flex; flex-direction: column; gap: 14px; }
    h2 { font-size: clamp(38px, 4.4vw, 60px); }
    .aside { color: var(--ls-muted); }
    .aside:empty { display: none; }
  `,
})
export class SectionHeading {
  readonly eyebrow = input.required<string>();
}
