import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { ServiceOffering } from '../models';
import { ServiceCard } from '../service-card/service-card';
import { ServiceDetail } from '../service-detail/service-detail';

/**
 * Service cards + detail panel. Adding a new line of business (e.g. video)
 * is a new entry in SERVICES — the grid adapts to the count.
 */
@Component({
  selector: 'ls-services-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ServiceCard, ServiceDetail],
  template: `
    <div class="grid" [style.--count]="services().length">
      @for (s of services(); track s.id) {
        <ls-service-card [service]="s" [selected]="s.id === selectedId()" (picked)="toggle($event)" />
      }
    </div>
    <!-- Keyed by id so a new selection re-creates the panel and replays its entrance animation. -->
    @for (s of selectedList(); track s.id) {
      <ls-service-detail [service]="s" />
    }
  `,
  styles: `
    @use 'styles/tokens' as *;
    :host { display: flex; flex-direction: column; gap: 24px; }
    .grid { display: grid; grid-template-columns: repeat(min(var(--count), 4), minmax(0, 1fr)); gap: 24px; }
    @include tablet-down { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    @include mobile { .grid { grid-template-columns: 1fr; gap: 14px; } }
  `,
})
export class ServicesSection {
  readonly services = input.required<readonly ServiceOffering[]>();
  readonly initial = input<string | null>(null);

  private readonly picked = signal<string | null | undefined>(undefined);
  protected readonly selectedId = computed(() =>
    this.picked() === undefined ? (this.initial() ?? this.services()[0]?.id ?? null) : this.picked(),
  );
  protected readonly selected = computed(() => this.services().find((s) => s.id === this.selectedId()) ?? null);
  protected readonly selectedList = computed(() => (this.selected() ? [this.selected()!] : []));

  /** Tapping the open card again collapses it (mobile accordion behaviour). */
  protected toggle(id: string) {
    this.picked.set(this.selectedId() === id ? null : id);
  }
}
