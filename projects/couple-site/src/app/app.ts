import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ClientSite } from './couple-site.model';
import { WeddingSite } from './wedding-site';
import { AlbumSite } from './album-site';

/**
 * Client site shell — served at <slug>.lightsplitters.com.
 * Loads site.json and renders the wedding or family-album template by `kind`.
 */
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [WeddingSite, AlbumSite],
  template: `
    @if (site(); as s) {
      @if (s.kind === 'album') {
        <ls-album-site [site]="s" />
      } @else {
        <ls-wedding-site [site]="s" />
      }
    } @else if (failed()) {
      <p class="ls-container status">This page isn't ready yet.</p>
    } @else {
      <p class="ls-container status" aria-busy="true">Loading…</p>
    }
  `,
  styles: `
    :host { display: block; }
    .status { padding-block: 120px; text-align: center; color: var(--ls-muted); }
  `,
})
export class App {
  protected readonly site = signal<ClientSite | null>(null);
  protected readonly failed = signal(false);

  constructor() {
    fetch('site.json', { cache: 'no-cache' })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((s: ClientSite) => {
        this.site.set(s);
        document.title = s.kind === 'album' ? s.title : `${s.names} — ${s.date}`;
      })
      .catch(() => this.failed.set(true));
  }
}
