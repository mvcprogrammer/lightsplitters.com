import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Uploads } from './couple-site.model';

/**
 * "Add your photos" panel shared by wedding sites (guests) and family albums (relatives).
 * The drop zone is inert until v2 uploads ship — `uploads.enabled` flips it on.
 */
@Component({
  selector: 'ls-photo-drop',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="share">
      <div class="col">
        @if (!uploads().enabled) {
          <span class="badge">Coming soon</span>
        }
        <h2>{{ heading() }}</h2>
        @if (uploads().email) {
          <p class="ls-lede">{{ intro() }}Upload straight from a phone, or email photos to
            <strong>{{ uploads().email }}</strong>. Everything lands in this one album.</p>
        } @else {
          <p class="ls-lede">{{ intro() }}Upload straight from a phone. Everything lands in this one album.</p>
        }
      </div>
      <div class="drop" [class.disabled]="!uploads().enabled">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4M7 9l5-5 5 5M4 16v4h16v-4" /></svg>
        <span>Drag photos here</span>
        <button type="button" class="ls-btn ls-btn--dark" [disabled]="!uploads().enabled">Choose photos</button>
      </div>
    </div>
  `,
  styles: `
    @use 'styles/tokens' as *;
    :host { display: block; }
    .share { border: 1px solid var(--ls-border); background: var(--ls-surface); padding: 48px; display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 56px; align-items: center; }
    .col { display: flex; flex-direction: column; gap: 20px; }
    h2 { font-size: clamp(36px, 4vw, 52px); }
    .badge { align-self: flex-start; font-size: 11px; letter-spacing: .2em; font-weight: 600; text-transform: uppercase;
      color: var(--ls-on-dark); background: var(--ls-accent); padding: 6px 10px; }
    .drop { height: 240px; border: 2px dashed var(--ls-border-strong); display: flex; flex-direction: column; align-items: center;
      justify-content: center; gap: 16px; color: var(--ls-muted); }
    .drop svg { width: 32px; height: 32px; fill: none; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; }
    .drop.disabled { opacity: .6; }
    .drop button[disabled] { cursor: not-allowed; }
    @include mobile { .share { grid-template-columns: 1fr; gap: 32px; padding: 24px; } }
  `,
})
export class PhotoDrop {
  readonly uploads = input.required<Uploads>();
  readonly heading = input('Share your photos.');
  /** Optional first sentence of the explanation; the upload/email line follows it. */
  readonly lede = input('');

  protected readonly intro = computed(() => (this.lede() ? this.lede() + ' ' : ''));
}
