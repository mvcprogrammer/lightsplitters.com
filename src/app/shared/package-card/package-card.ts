import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { WeddingPackage } from '../models';
import { ResponsiveImage } from '../responsive-image/responsive-image';
import { CheckList } from '../check-list/check-list';

/** Selectable wedding package. Shows the couple-website line when the add-on is on. */
@Component({
  selector: 'ls-package-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResponsiveImage, CheckList],
  template: `
    <button type="button" [attr.aria-pressed]="selected()" (click)="picked.emit(pkg().id)">
      <ls-responsive-image class="media" [photo]="pkg().photo" sizes="(max-width: 767px) 100vw, 33vw" />
      <div class="body">
        <div class="head">
          <span class="name">{{ pkg().name }}</span>
          <span class="tag">{{ pkg().tag }}</span>
        </div>
        <span class="price">{{ pkg().price }}</span>
        <ls-check-list class="list" [items]="pkg().includes" [extra]="siteAddon() ? addonLabel() : null" />
        <span class="cta">{{ selected() ? 'Selected' : 'Choose ' + pkg().name }}</span>
      </div>
    </button>
  `,
  styles: `
    @use 'styles/tokens' as *;
    :host { display: flex; }
    button { display: flex; flex-direction: column; width: 100%; padding: 0; margin: 0; font: inherit; color: inherit;
      text-align: left; cursor: pointer; background: var(--ls-surface); border: 1px solid var(--ls-border);
      transition: transform .25s var(--ls-ease), box-shadow .25s ease; }
    button:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(28,27,25,.12); }
    :host(.is-selected) button { border-color: var(--ls-ink); box-shadow: 0 0 0 1px var(--ls-ink); }
    .media { height: 260px; width: 100%; }
    .body { padding: 32px; display: flex; flex-direction: column; gap: 20px; flex-grow: 1; width: 100%; }
    .head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
    .name { font-family: var(--ls-font-display); font-size: 40px; font-weight: 600; line-height: 1; }
    .tag { font-size: 12px; letter-spacing: .16em; text-transform: uppercase; color: var(--ls-accent); font-weight: 600; }
    .price { font-family: var(--ls-font-display); font-size: 30px; line-height: 1; }
    .list { padding-top: 20px; border-top: 1px solid var(--ls-border); flex-grow: 1; }
    .cta { height: 50px; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 600;
      letter-spacing: .06em; border: 1px solid var(--ls-ink); }
    :host(.is-selected) .cta { background: var(--ls-ink); color: var(--ls-on-dark); }
    @include mobile { .media { height: 220px; } .body { padding: 24px; } }
  `,
  host: { '[class.is-selected]': 'selected()' },
})
export class PackageCard {
  readonly pkg = input.required<WeddingPackage>();
  readonly selected = input(false);
  readonly siteAddon = input(false);
  readonly addonLabel = input('Couple website · yourname.lightsplitters.com');
  readonly picked = output<string>();
}
