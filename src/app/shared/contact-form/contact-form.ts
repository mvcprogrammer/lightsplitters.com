import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService, SendResult } from './contact.service';

/** Inquiry form. Pre-select a service with [service]="'Wedding'". */
@Component({
  selector: 'ls-contact-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    @if (result() === 'sent') {
      <div class="done" role="status">
        <span class="title">Thank you.</span>
        <p>Your inquiry is on its way. We'll reply within {{ responseTime() }}.</p>
      </div>
    } @else {
      <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
        <div class="row">
          <label>Name <input type="text" formControlName="name" autocomplete="name" required /></label>
          <label>Email <input type="email" formControlName="email" autocomplete="email" required /></label>
        </div>
        <div class="row">
          <label>Service
            <select formControlName="service">
              @for (s of services(); track s) {
                <option [value]="s">{{ s }}</option>
              }
            </select>
          </label>
          <label>Date (if known) <input type="date" formControlName="date" /></label>
        </div>
        <label>Message <textarea rows="5" formControlName="message" required></textarea></label>
        <label class="hp" aria-hidden="true">Company <input type="text" formControlName="company" tabindex="-1" autocomplete="off" /></label>

        @if (showErrors() && form.invalid) {
          <p class="err" role="alert">Please add your name, a valid email and a short message.</p>
        }
        @if (result() === 'error') {
          <p class="err" role="alert">Something went wrong sending that. Please try again or give us a call.</p>
        }
        @if (result() === 'not-configured') {
          <p class="err" role="alert">The form isn't connected yet — set contactEndpoint in src/environments/environment.ts.</p>
        }
        <button class="ls-btn ls-btn--dark" type="submit" [disabled]="sending()">
          {{ sending() ? 'Sending…' : 'Send inquiry' }}
        </button>
      </form>
    }
  `,
  styles: `
    @use 'styles/tokens' as *;
    :host { display: block; background: var(--ls-surface); border: 1px solid var(--ls-border); padding: 40px; }
    form { display: flex; flex-direction: column; gap: 20px; }
    .row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
    label { display: flex; flex-direction: column; gap: 8px; font-size: 13px; font-weight: 500; }
    input, select, textarea { min-height: 46px; border: 1px solid var(--ls-border-strong); padding: 0 14px; font: inherit;
      font-size: 15px; background: #fff; color: var(--ls-ink); border-radius: 0; }
    textarea { padding: 12px 14px; resize: vertical; }
    input.ng-invalid.ng-touched, textarea.ng-invalid.ng-touched { border-color: #9b2c2c; }
    .hp { position: absolute; left: -9999px; }
    .err { margin: 0; color: #9b2c2c; font-size: 14px; }
    button[disabled] { opacity: .6; cursor: progress; }
    .done { display: flex; flex-direction: column; gap: 10px; }
    .done .title { font-family: var(--ls-font-display); font-size: 40px; }
    .done p { margin: 0; color: var(--ls-muted); }
    @include mobile { :host { padding: 24px; } .row { grid-template-columns: 1fr; } }
  `,
})
export class ContactForm {
  private readonly contact = inject(ContactService);
  private readonly fb = inject(FormBuilder).nonNullable;

  readonly services = input<string[]>(['Wedding', 'Portrait session', 'Photo digitizing', 'Prints & framing', 'Something else']);
  readonly service = input<string>('Wedding');
  readonly responseTime = input('4 hours');

  protected readonly sending = signal(false);
  protected readonly showErrors = signal(false);
  protected readonly result = signal<SendResult | null>(null);

  protected readonly form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    service: [''],
    date: [''],
    message: ['', [Validators.required, Validators.maxLength(5000)]],
    company: [''],
  });

  ngOnInit() {
    this.form.controls.service.setValue(this.service());
  }

  protected async submit() {
    this.showErrors.set(true);
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.sending.set(true);
    this.result.set(await this.contact.send(this.form.getRawValue()));
    this.sending.set(false);
  }
}
