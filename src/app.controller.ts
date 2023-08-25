import { Controller, Post, Req, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { Source } from './models';
import { ResponseInterceptor } from './response/response.interceptor';

@Controller({ path: 'api/earth-mars-comm' })
@UseInterceptors(ResponseInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('message')
  translate(@Req() req: Request) {
    const sender = req.headers['x-sender'] as Source;
    const message = req.body?.message;
    return {
      message,
      translation: this.appService.translate(message, sender),
      source: sender,
    };
  }
}

