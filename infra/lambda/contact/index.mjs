// Contact form → email via Amazon SES. Deploy as a Lambda (Node.js 22+) with a Function URL.
// Env vars:
//   TO_EMAIL        where inquiries go            (set in the Lambda console, not in code)
//   FROM_EMAIL      a verified SES identity       e.g. website@lightsplitters.com
//   ALLOWED_ORIGIN  https://lightsplitters.com
// IAM: the function role needs ses:SendEmail on the FROM identity.
// Configure CORS on the Function URL (AllowOrigins = ALLOWED_ORIGIN, AllowMethods = POST,
// AllowHeaders = content-type) instead of in code.

import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';

const ses = new SESv2Client({});
const { TO_EMAIL, FROM_EMAIL, ALLOWED_ORIGIN } = process.env;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const reply = (statusCode, body) => ({
  statusCode,
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(body),
});

const clean = (v, max) => String(v ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, max);

export const handler = async (event) => {
  if (event.requestContext?.http?.method !== 'POST') return reply(405, { error: 'method' });
  const origin = event.headers?.origin ?? '';
  if (ALLOWED_ORIGIN && origin !== ALLOWED_ORIGIN) return reply(403, { error: 'origin' });

  let data;
  try {
    const raw = event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString() : event.body;
    data = JSON.parse(raw ?? '{}');
  } catch {
    return reply(400, { error: 'json' });
  }

  // Honeypot: real visitors never fill "company"
  if (data.company) return reply(200, { ok: true });

  const name = clean(data.name, 120);
  const email = clean(data.email, 200);
  const service = clean(data.service, 60);
  const date = clean(data.date, 20);
  const message = String(data.message ?? '').trim().slice(0, 5000);
  if (!name || !EMAIL_RE.test(email) || !message) return reply(400, { error: 'validation' });

  await ses.send(
    new SendEmailCommand({
      FromEmailAddress: FROM_EMAIL,
      Destination: { ToAddresses: [TO_EMAIL] },
      ReplyToAddresses: [email],
      Content: {
        Simple: {
          Subject: { Data: `New inquiry: ${service || 'General'} — ${name}` },
          Body: {
            Text: {
              Data: `Name: ${name}\nEmail: ${email}\nService: ${service}\nDate: ${date || '—'}\n\n${message}`,
            },
          },
        },
      },
    }),
  );
  return reply(200, { ok: true });
};
