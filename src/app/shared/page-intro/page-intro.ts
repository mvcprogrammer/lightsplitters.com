import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Top-of-page intro (eyebrow + h1 + lede + optional aside such as a toggle).
 * <ls-page-intro eyebrow="Wedding collections" lede="…">Your day, told <em>start to finish.</em></ls-page-intro>
 */
@Component({
  selector: 'ls-page-intro',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="main">
      <span class="ls-eyebrow">{{ eyebrow() }}</span>
      <h1><ng-content /></h1>
      @if (lede()) {
        <p class="ls-lede">{{ lede() }}</p>
      }
    </div>
    <ng-content select="[aside]" />
  `,
  styles: `
    @use 'styles/tokens' as *;
    :host { display: flex; justify-content: space-between; align-items: flex-end; gap: 48px; flex-wrap: wrap;
      padding-block: 88px 40px; }
    .main { display: flex; flex-direction: column; gap: 18px; max-width: 780px; }
    h1 { font-size: clamp(44px, 5.4vw, 76px); }
    @include mobile { :host { padding-block: 40px 24px; gap: 24px; } }
  `,
})
export class PageIntro {
  readonly eyebrow = input.required<string>();
  readonly lede = input('');
}
