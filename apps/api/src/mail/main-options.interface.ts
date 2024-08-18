export interface MailOptions {
  to: string;
  subject: string;
  htmlBody: string;
  data: Record<string, string>;
}
