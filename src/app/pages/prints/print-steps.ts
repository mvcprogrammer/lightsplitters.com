import { ChangeDetectionStrategy, Component } from '@angular/core';

/** The three-step "screen to wall" strip used on the home page and the prints page. */
@Component({
  selector: 'ls-print-steps',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (s of steps; track s.n) {
      <div class="step">
        <span class="n">{{ s.n }}</span>
        <span class="t">{{ s.title }}</span>
        <span class="d">{{ s.text }}</span>
      </div>
    }
  `,
  styles: `
    @use 'styles/tokens' as *;
    :host { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px; }
    .step { border-top: 1px solid var(--ls-dark-rule); padding-top: 28px; display: flex; flex-direction: column; gap: 12px; }
    .n { font-family: var(--ls-font-display); font-size: 48px; color: var(--ls-accent-on-dark); line-height: 1; }
    .t { font-size: 20px; font-weight: 500; }
    .d { font-size: 15px; color: var(--ls-on-dark-muted); }
    @include mobile { :host { grid-template-columns: 1fr; gap: 18px; } .step { padding-top: 16px; } .n { font-size: 30px; } }
  `,
})
export class PrintSteps {
  protected readonly steps = [
    { n: '01', title: 'Choose your favorites', text: 'Pick straight from your private gallery — or send us your own files.' },
    { n: '02', title: 'Paper, size & frame', text: 'Fine-art paper, canvas, or framed and ready to hang.' },
    { n: '03', title: 'Delivered or picked up', text: 'Shipped to your door or ready for pickup at the studio.' },
  ];
}
