import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Brass-check bullet list used in service details and package cards. */
@Component({
  selector: 'ls-check-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul>
      @for (item of items(); track item) {
        <li>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          <span>{{ item }}</span>
        </li>
      }
      @if (extra()) {
        <li class="extra">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
          <span>{{ extra() }}</span>
        </li>
      }
    </ul>
  `,
  styles: `
    ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
    li { display: flex; gap: 12px; align-items: flex-start; font-size: 15px; line-height: 1.45; }
    li.extra { font-weight: 600; color: var(--ls-accent); }
    svg { width: 18px; height: 18px; flex-shrink: 0; margin-top: 1px; fill: none; stroke: var(--ls-accent); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
  `,
})
export class CheckList {
  readonly items = input.required<readonly string[]>();
  /** Optional highlighted add-on line (e.g. the couple website). */
  readonly extra = input<string | null>(null);
}
