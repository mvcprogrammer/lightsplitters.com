import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageIntro } from '@shared/page-intro/page-intro';
import { ToggleSwitch } from '@shared/toggle-switch/toggle-switch';
import { PackageCard } from '@shared/package-card/package-card';
import { ResponsiveImage } from '@shared/responsive-image/responsive-image';
import { COUPLE_SITE_ADDON, WEDDING_PACKAGES } from '../../content/site-content';
import { PHOTOS } from '../../content/photos';

@Component({
  selector: 'ls-weddings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, PageIntro, ToggleSwitch, PackageCard, ResponsiveImage],
  template: `
    <div class="ls-container">
      <ls-page-intro eyebrow="Wedding collections"
        lede="Three collections to start from, each adjustable. Add a private couple website to any of them.">
        Your day, told <em>start to finish.</em>
        <ls-toggle-switch aside [(checked)]="siteOn" [label]="addon.label" [detail]="addon.detail + ' · ' + addon.price" />
      </ls-page-intro>

      <div class="packages">
        @for (p of packages; track p.id) {
          <ls-package-card [pkg]="p" [selected]="p.id === selectedId()" [siteAddon]="siteOn()" (picked)="selectedId.set($event)" />
        }
      </div>

      <div class="summary" aria-live="polite">
        <div class="col">
          <span class="ls-eyebrow">Your selection</span>
          <span class="sel">{{ summary() }}</span>
        </div>
        <a class="ls-btn check" routerLink="/contact" [queryParams]="{ service: 'Wedding', pkg: selectedId(), site: siteOn() }">Check my date</a>
      </div>
    </div>

    <section class="ls-section">
      <div class="ls-container site">
        <a class="browser" href="https://sample.lightsplitters.com" aria-label="Open the example couple site">
          <span class="chrome"><i></i><i></i><i></i><span>sample.lightsplitters.com</span></span>
          <span class="shot">
            <ls-responsive-image [photo]="photos.heroCoupleStone" sizes="(max-width: 767px) 100vw, 45vw" />
            <span class="overlay">
              <span class="names">Elena &amp; Marcus</span>
              <span class="when">October 17, 2026 · The Orlo, Tampa</span>
            </span>
          </span>
        </a>
        <div class="col">
          <span class="ls-eyebrow">The couple website</span>
          <h2>One link for everything your guests need.</h2>
          <p class="ls-lede">Your story, the schedule, directions, and — after the day — your gallery, all at your own
            address like sample.lightsplitters.com.</p>
        </div>
      </div>
    </section>
  `,
  styleUrl: './weddings.scss',
})
export class Weddings {
  protected readonly packages = WEDDING_PACKAGES;
  protected readonly addon = COUPLE_SITE_ADDON;
  protected readonly photos = PHOTOS;

  protected readonly selectedId = signal(WEDDING_PACKAGES.find((p) => p.recommended)?.id ?? WEDDING_PACKAGES[0].id);
  protected readonly siteOn = signal(false);
  protected readonly summary = computed(() => {
    const p = this.packages.find((x) => x.id === this.selectedId());
    return `${p?.name ?? ''} collection${this.siteOn() ? ' + couple website' : ''}`;
  });
}
