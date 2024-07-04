import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class WebhookService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async sendEvent(event: string, data: any): Promise<void> {
    const webhookUrl = this.configService.get<string>('WEBHOOK_URL');
    await this.httpService.post(webhookUrl, { event, data }).toPromise();
  }
}
