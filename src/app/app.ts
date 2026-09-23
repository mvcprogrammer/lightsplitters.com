import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeader } from '@shared/site-header/site-header';
import { SiteFooter } from '@shared/site-footer/site-footer';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  template: `
    <a class="skip" href="#main">Skip to content</a>
    <ls-site-header />
    <main id="main"><router-outlet /></main>
    <ls-site-footer />
  `,
  styles: `
    .skip { position: absolute; left: -9999px; top: 8px; z-index: 20; background: var(--ls-ink); color: var(--ls-on-dark); padding: 10px 16px; }
    .skip:focus { left: 8px; }
  `,
})
export class App {}
