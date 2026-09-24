import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Logo } from '../logo/logo';

export const NAV_LINKS = [
  { label: 'Weddings', link: '/weddings' },
  { label: 'Portraits', link: '/portraits' },
  { label: 'Family Album', link: '/family-album' },
  { label: 'Prints & Framing', link: '/prints' },
  { label: 'Portfolio', link: '/', fragment: 'portfolio' },
];

@Component({
  selector: 'ls-site-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, Logo],
  template: `
    <div class="bar ls-container">
      <a routerLink="/" class="home" aria-label="LightSplitters Media — home"><ls-logo /></a>
      <nav id="site-nav" [class.open]="menuOpen()" aria-label="Main">
        @for (l of links; track l.label) {
          <a class="navlink" [routerLink]="l.link" [fragment]="l.fragment" routerLinkActive="active"
             [routerLinkActiveOptions]="{ exact: true }" (click)="menuOpen.set(false)">{{ l.label }}</a>
        }
        <a class="ls-btn ls-btn--dark cta" routerLink="/contact" (click)="menuOpen.set(false)">Book a consultation</a>
      </nav>
      <button type="button" class="menu" aria-controls="site-nav" [attr.aria-expanded]="menuOpen()"
              [attr.aria-label]="menuOpen() ? 'Close menu' : 'Open menu'" (click)="menuOpen.set(!menuOpen())">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          @if (menuOpen()) { <path d="M6 6l12 12M18 6L6 18" /> } @else { <path d="M4 7h16M4 12h16M4 17h16" /> }
        </svg>
      </button>
    </div>
  `,
  styles: `
    @use 'styles/tokens' as *;
    :host { display: block; border-bottom: 1px solid var(--ls-border); background: var(--ls-bg); position: sticky; top: 0; z-index: 10; }
    .bar { height: 96px; display: flex; align-items: center; justify-content: space-between; }
    .home { text-decoration: none; }
    nav { display: flex; align-items: center; gap: 40px; font-size: 15px; }
    .navlink { color: var(--ls-ink); text-decoration: none; }
    .navlink:hover, .navlink.active { color: var(--ls-accent); }
    .cta { min-height: 46px; padding: 0 24px; font-size: 14px; letter-spacing: .04em; }
    .menu { display: none; width: 44px; height: 44px; align-items: center; justify-content: center; background: transparent;
      border: 1px solid var(--ls-border-strong); cursor: pointer; }
    .menu svg { width: 20px; height: 20px; fill: none; stroke: var(--ls-ink); stroke-width: 1.8; stroke-linecap: round; }
    @include tablet-down { nav { gap: 24px; } }
    @media (max-width: 960px) {
      .bar { height: 72px; }
      .menu { display: flex; }
      nav { display: none; position: absolute; top: 72px; left: 0; right: 0; flex-direction: column; align-items: stretch;
        gap: 0; padding: 8px var(--ls-gutter) 24px; background: var(--ls-bg); border-bottom: 1px solid var(--ls-border); }
      nav.open { display: flex; }
      .navlink { padding: 14px 0; border-bottom: 1px solid var(--ls-border); font-size: 17px; }
      .cta { margin-top: 16px; }
    }
  `,
})
export class SiteHeader {
  protected readonly links = NAV_LINKS;
  protected readonly menuOpen = signal(false);
}
