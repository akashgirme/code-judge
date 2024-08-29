import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import mjml from 'mjml';
import { footerMjml, headerMjml } from './mjml';
import { MailOptions } from './main-options.interface';

@Injectable()
export class MailService {
  SesClient: SESClient;

  constructor(private configService: ConfigService) {
    this.SesClient = new SESClient();
  }

  async sendMail({ to, htmlBody, data, subject }: MailOptions): Promise<unknown> {
    const htmlOutput = this.getHtmlFromMjmlFile(htmlBody, data);
    const params = {
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: htmlOutput,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: `"Code-Judge" <${this.configService.get<string>('SES_EMAIL_SENDER')}>`,
    };

    try {
      console.log(params);
      const data = await this.SesClient.send(new SendEmailCommand(params));
      console.log('Email sent:', data.MessageId);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: error };
    }
  }

  getHtmlFromMjmlFile(body: string, data: Record<string, string>) {
    let htmlOutput = mjml(`${headerMjml}${body}${footerMjml}`).html;

    Object.keys(data).forEach((key) => {
      const placeholder = new RegExp(`{{${key}}}`, 'g');
      htmlOutput = htmlOutput.replace(placeholder, data[key]);
    });

    return htmlOutput;
  }
}
