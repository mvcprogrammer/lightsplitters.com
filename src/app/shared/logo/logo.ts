import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Prism mark + wordmark. "Media" (not "Photography") keeps room for video and more. */
@Component({
  selector: 'ls-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg class="mark" viewBox="0 0 30 26" fill="none" aria-hidden="true">
      <path d="M11 2L20 22H2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
      <path d="M1 12h5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
      <path d="M16 12l13-5" stroke="var(--ls-beam-red)" stroke-width="1.6" stroke-linecap="round" />
      <path d="M16.8 14h12.2" stroke="var(--ls-beam-green)" stroke-width="1.6" stroke-linecap="round" />
      <path d="M17.6 16l11.4 5" stroke="var(--ls-beam-blue)" stroke-width="1.6" stroke-linecap="round" />
    </svg>
    <span class="words">
      <span class="name">LightSplitters</span>
      @if (!compact()) {
        <span class="tag">MEDIA</span>
      }
    </span>
  `,
  styles: `
    :host { display: inline-flex; align-items: center; gap: 14px; color: var(--ls-ink); }
    .mark { width: 30px; height: 26px; flex-shrink: 0; }
    .words { display: flex; flex-direction: column; gap: 2px; }
    .name { font-family: var(--ls-font-display); font-size: 28px; font-weight: 600; line-height: 1; }
    .tag { font-size: 10px; letter-spacing: 0.32em; color: var(--ls-muted); }
    :host(.small) .name { font-size: 24px; }
    :host(.small) .mark { width: 24px; height: 21px; }
  `,
})
export class Logo {
  readonly compact = input(false);
}
