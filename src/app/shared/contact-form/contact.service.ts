import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface Inquiry {
  name: string;
  email: string;
  service: string;
  date: string;
  message: string;
  /** Honeypot — must stay empty. Bots fill it; people never see it. */
  company: string;
}

export type SendResult = 'sent' | 'not-configured' | 'error';

/**
 * Posts the inquiry as JSON to `environment.contactEndpoint`.
 * Works unchanged with Formspree or with the Lambda in infra/lambda/contact.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  async send(inquiry: Inquiry): Promise<SendResult> {
    if (!environment.contactEndpoint) return 'not-configured';
    try {
      const res = await fetch(environment.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(inquiry),
      });
      return res.ok ? 'sent' : 'error';
    } catch {
      return 'error';
    }
  }
}
