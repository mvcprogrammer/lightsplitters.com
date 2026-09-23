export const environment = {
  /**
   * Where the inquiry form POSTs JSON.
   * - Start: a Formspree endpoint, e.g. 'https://formspree.io/f/xxxxxxx'
   * - Later: the Lambda Function URL from infra/lambda/contact
   * Leave empty and the form shows a "not connected yet" message instead of sending.
   */
  contactEndpoint: 'https://ohiwvo4r5bcaxnrxhb4vs44hmm0rqxtt.lambda-url.us-east-1.on.aws/',
  /** Booking embed (v2): Cal.com or Calendly scheduling URL. */
  bookingUrl: '',
};
