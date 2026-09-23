import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BUSINESS } from '../../content/site-content';
import { NAV_LINKS } from '../site-header/site-header';

@Component({
  selector: 'ls-site-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="ls-container inner">
      <span>© {{ year }} {{ biz.name }}</span>
      <nav aria-label="Footer">
        @for (l of links; track l.label) {
          <a [routerLink]="l.link" [fragment]="l.fragment">{{ l.label }}</a>
        }
        <a routerLink="/contact">Contact</a>
      </nav>
      <span>{{ biz.domain }}</span>
    </div>
  `,
  styles: `
    :host { display: block; border-top: 1px solid var(--ls-border); }
    .inner { display: flex; justify-content: space-between; align-items: center; gap: 24px; flex-wrap: wrap;
      padding-block: 28px 40px; font-size: 13px; color: var(--ls-muted); }
    nav { display: flex; gap: 20px; flex-wrap: wrap; }
    a { color: var(--ls-muted); text-decoration: none; }
    a:hover { color: var(--ls-accent); }
  `,
})
export class SiteFooter {
  protected readonly biz = BUSINESS;
  protected readonly links = NAV_LINKS;
  protected readonly year = new Date().getFullYear();
}
