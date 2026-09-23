import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

/**
 * Add-on toggle card (e.g. "Add a couple website").
 * Two-way bind: <ls-toggle-switch [(checked)]="siteOn" label="…" detail="…" />
 */
@Component({
  selector: 'ls-toggle-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" role="switch" [attr.aria-checked]="checked()" (click)="checked.set(!checked())">
      <span class="track"><span class="knob"></span></span>
      <span class="text">
        <span class="label">{{ label() }}</span>
        @if (detail()) {
          <span class="detail">{{ detail() }}</span>
        }
      </span>
    </button>
  `,
  styles: `
    button { display: flex; align-items: center; gap: 16px; padding: 18px 22px; background: var(--ls-surface);
      border: 1px solid var(--ls-border); font: inherit; color: inherit; cursor: pointer; text-align: left; }
    .track { width: 50px; height: 28px; border-radius: 14px; background: #b8b1a6; display: flex; align-items: center;
      padding: 3px; transition: background .2s ease; flex-shrink: 0; }
    .knob { width: 22px; height: 22px; border-radius: 11px; background: #fff; transition: transform .2s ease; }
    [aria-checked='true'] .track { background: var(--ls-accent); }
    [aria-checked='true'] .knob { transform: translateX(22px); }
    .text { display: flex; flex-direction: column; gap: 4px; }
    .label { font-size: 15px; font-weight: 600; }
    .detail { font-size: 13px; color: var(--ls-muted); }
  `,
})
export class ToggleSwitch {
  readonly checked = model(false);
  readonly label = input.required<string>();
  readonly detail = input('');
}
