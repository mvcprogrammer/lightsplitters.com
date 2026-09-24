import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageIntro } from '@shared/page-intro/page-intro';
import { CheckList } from '@shared/check-list/check-list';
import { ResponsiveImage } from '@shared/responsive-image/responsive-image';
import { ContactForm } from '@shared/contact-form/contact-form';
import { FAMILY_ALBUM, SERVICES } from '../../content/site-content';

/**
 * Family album: a private online album (same template as the couple sites, `kind: "album"`)
 * the whole family can view, download, share and add to. We photograph the prints to fill it.
 */
@Component({
  selector: 'ls-family-album',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageIntro, CheckList, ResponsiveImage, ContactForm],
  template: `
    <div class="ls-container">
      <ls-page-intro [eyebrow]="service.title"
        lede="One private online album for the whole family. Bring us the albums, shoeboxes and envelopes; we photograph and tidy every print, then give you a page of your own to browse, download, share and add to.">
        The whole family, <em>one album.</em>
      </ls-page-intro>
      <div class="facts">
        <ls-check-list [items]="service.includes" />
        <div class="tiers">
          <span class="label">Pricing</span>
          @for (t of content.pricing; track t.name) {
            <div class="tier">
              <span class="amount">{{ t.price }} <small>{{ t.per }}</small></span>
              <span class="tier-name">{{ t.name }}</span>
              <span class="tier-text">{{ t.text }}</span>
            </div>
          }
        </div>
      </div>
    </div>

    <section class="ls-section ls-section--alt">
      <div class="ls-container">
        <span class="ls-eyebrow">How it works</span>
        <div class="process">
          <figure class="rig">
            <ls-responsive-image [photo]="content.processPhoto" sizes="(max-width: 767px) 100vw, 50vw" />
            <figcaption>{{ content.processCaption }}</figcaption>
          </figure>
          <div class="steps">
            @for (s of content.steps; track s.n) {
              <div class="step">
                <span class="n">{{ s.n }}</span>
                <span class="t">{{ s.title }}</span>
                <span class="d">{{ s.text }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </section>

    <section class="ls-section">
      <div class="ls-container album">
        <a class="browser" [href]="content.album.sampleUrl" aria-label="Open the example family album">
          <span class="chrome"><i></i><i></i><i></i><span>{{ content.album.sampleHost }}</span></span>
          <span class="shot">
            <ls-responsive-image [photo]="content.album.samplePhoto" sizes="(max-width: 767px) 100vw, 45vw" />
            <span class="overlay">
              <span class="names">{{ content.album.sampleTitle }}</span>
              <span class="when">{{ content.album.sampleSubtitle }}</span>
            </span>
          </span>
        </a>
        <div class="col">
          <span class="ls-eyebrow">Your album</span>
          <h2>A private website the whole family can add to.</h2>
          <p class="ls-lede">Every photo lives at your own address, like {{ content.album.sampleHost }}. Share the link
            with the family; they browse, download full-size files and drop in the photos they've kept.</p>
          <ls-check-list [items]="content.album.features" />
        </div>
      </div>
    </section>

    <section class="ls-section ls-section--alt">
      <div class="ls-container contact">
        <h2>Start your family album</h2>
        <ls-contact-form service="Family album" />
      </div>
    </section>
  `,
  styles: `
    @use 'styles/tokens' as *;
    .facts { display: grid; grid-template-columns: 2fr 1fr; gap: 48px; padding: 36px 0 56px; border-top: 1px solid var(--ls-border); }
    .tiers { display: flex; flex-direction: column; gap: 22px; }
    .tier { display: flex; flex-direction: column; gap: 4px; }
    .label { font-size: 13px; letter-spacing: .14em; text-transform: uppercase; color: var(--ls-muted); }
    .amount { font-family: var(--ls-font-display); font-size: 40px; line-height: 1; }
    .amount small { font-family: var(--ls-font-body); font-size: 14px; color: var(--ls-muted); }
    .tier-name { font-size: 16px; font-weight: 500; margin-top: 4px; }
    .tier-text { font-size: 14px; color: var(--ls-muted); line-height: 1.5; }

    .process { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 64px; align-items: start; margin-top: 28px; }
    .rig { margin: 0; display: flex; flex-direction: column; gap: 12px; }
    .rig ls-responsive-image { aspect-ratio: 5 / 4; }
    .rig figcaption { font-size: 13px; color: var(--ls-muted); line-height: 1.5; }
    .steps { display: flex; flex-direction: column; gap: 28px; }
    .step { border-top: 1px solid var(--ls-border-strong); padding-top: 20px; display: grid; grid-template-columns: 64px 1fr; column-gap: 20px; row-gap: 6px; }
    .n { grid-row: 1 / span 2; font-family: var(--ls-font-display); font-size: 44px; color: var(--ls-accent); line-height: 1; }
    .t { font-size: 20px; font-weight: 500; }
    .d { font-size: 15px; color: var(--ls-muted); line-height: 1.55; }

    .album { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 80px; align-items: center; }
    .col { display: flex; flex-direction: column; gap: 18px; }
    h2 { font-size: clamp(34px, 4vw, 52px); }
    .browser { display: flex; flex-direction: column; height: 460px; background: var(--ls-surface); border: 1px solid #d8d0c4;
      box-shadow: 0 24px 50px rgba(28, 27, 25, .12); text-decoration: none; color: var(--ls-ink); overflow: hidden; }
    .chrome { height: 34px; flex-shrink: 0; display: flex; align-items: center; gap: 8px; padding: 0 14px; background: var(--ls-bg-alt);
      border-bottom: 1px solid var(--ls-border); font-size: 12px; color: var(--ls-muted); }
    .chrome i { width: 9px; height: 9px; border-radius: 5px; background: var(--ls-border-strong); }
    .chrome span { margin-left: 10px; }
    .shot { position: relative; flex-grow: 1; }
    .shot ls-responsive-image { position: absolute; inset: 0; }
    .overlay { position: absolute; left: 0; right: 0; bottom: 0; padding: 60px 28px 24px; display: flex; flex-direction: column; gap: 6px;
      background: linear-gradient(180deg, rgba(20, 19, 17, 0) 0%, rgba(20, 19, 17, .72) 100%); color: var(--ls-on-dark); }
    .names { font-family: var(--ls-font-display); font-size: 40px; font-style: italic; line-height: 1; }
    .when { font-size: 12px; letter-spacing: .24em; }

    .contact { display: grid; grid-template-columns: 1fr 1.4fr; gap: 64px; align-items: start; }

    @include mobile {
      .facts, .process, .album, .contact { grid-template-columns: 1fr; gap: 28px; }
      .step { padding-top: 16px; grid-template-columns: 44px 1fr; column-gap: 14px; } .n { font-size: 30px; }
      .browser { height: 340px; }
    }
  `,
})
export class FamilyAlbum {
  protected readonly content = FAMILY_ALBUM;
  protected readonly service = SERVICES.find((s) => s.id === 'family-album')!;
}
