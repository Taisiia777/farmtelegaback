import { Controller, Post, Body } from '@nestjs/common';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  async sendEvent(@Body('event') event: string, @Body('data') data: any) {
    await this.webhookService.sendEvent(event, data);
  }
}
