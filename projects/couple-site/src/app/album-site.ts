import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ResponsiveImage } from '@shared/responsive-image/responsive-image';
import { GalleryGrid } from '@shared/gallery-grid/gallery-grid';
import { AlbumSite as AlbumSiteData } from './couple-site.model';
import { PhotoDrop } from './photo-drop';

/** Family album template — reproduced prints to browse, download at full size, share and add to. */
@Component({
  selector: 'ls-album-site',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ResponsiveImage, GalleryGrid, PhotoDrop],
  template: `
    @let s = site();
    <header class="ls-container bar">
      <span class="mono">{{ s.title }}</span>
      <nav aria-label="Sections">
        <a href="#album">Album</a>
        <a href="#add">Add photos</a>
      </nav>
    </header>

    <main>
      <section class="ls-container hero">
        @if (s.coverPhoto) {
          <ls-responsive-image class="hero-img" [photo]="s.coverPhoto" [basePath]="photoBase" [eager]="true" sizes="100vw" />
        }
        <div class="title">
          <h1>{{ s.title }}</h1>
          @if (s.subtitle) {
            <span class="when">{{ s.subtitle }}</span>
          }
        </div>
      </section>

      <section id="album" class="ls-container ls-section">
        <div class="album-head">
          <div class="col">
            <span class="ls-eyebrow">The album</span>
            @if (s.intro) {
              <p class="ls-lede">{{ s.intro }}</p>
            }
          </div>
          <span class="hint">
            {{ s.downloads ? 'Tap a photo to view it — the full-size download is in the viewer' : 'Tap a photo to view it larger' }}
          </span>
        </div>
        <ls-gallery-grid [photos]="s.gallery" [basePath]="photoBase" [columns]="4" [downloadable]="s.downloads" />
      </section>

      <section id="add" class="ls-container add-wrap">
        <ls-photo-drop [uploads]="s.uploads" heading="Have more? Add them to the album."
                       lede="Anyone in the family can add the photos they've kept." />
      </section>
    </main>

    <footer class="foot">
      <span>{{ s.slug }}.lightsplitters.com</span>
      <a href="https://lightsplitters.com/family-album">A family album by LightSplitters Media</a>
    </footer>
  `,
  styles: `
    @use 'styles/tokens' as *;
    :host { display: block; }
    .bar { height: 88px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
    .mono { font-family: var(--ls-font-display); font-size: 30px; font-style: italic; }
    nav { display: flex; gap: 40px; font-size: 15px; }
    nav a { color: var(--ls-ink); text-decoration: none; }
    nav a:hover { color: var(--ls-accent); }
    .hero { display: flex; flex-direction: column; gap: 48px; align-items: center; padding-top: 24px; }
    .hero-img { width: 100%; height: min(620px, 60vw); }
    .title { display: flex; flex-direction: column; gap: 16px; align-items: center; text-align: center; }
    h1 { font-size: clamp(52px, 7vw, 84px); }
    .when { font-size: 14px; letter-spacing: .28em; text-transform: uppercase; color: var(--ls-muted); }
    .album-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; margin-bottom: 28px; }
    .col { display: flex; flex-direction: column; gap: 16px; }
    .hint { font-size: 14px; color: var(--ls-muted); text-align: right; flex-shrink: 0; max-width: 320px; }
    .add-wrap { padding-bottom: var(--ls-section-y); }
    .foot { padding: 80px var(--ls-gutter) 48px; display: flex; flex-direction: column; align-items: center; gap: 8px;
      font-size: 13px; color: var(--ls-muted); }
    .foot a { text-decoration: none; }
    @include mobile {
      .bar { height: auto; padding-block: 20px; flex-direction: column; }
      nav { gap: 20px; flex-wrap: wrap; justify-content: center; }
      .hero-img { height: 420px; }
      .album-head { flex-direction: column; align-items: flex-start; gap: 12px; }
      .hint { text-align: left; max-width: none; }
    }
  `,
})
export class AlbumSite {
  readonly site = input.required<AlbumSiteData>();
  /** Photos live beside site.json in the album's own folder. */
  protected readonly photoBase = 'photos/';
}
