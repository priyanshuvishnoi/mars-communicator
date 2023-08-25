import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddlewareMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: any, next: NextFunction) {
    const entryTime = new Date();
    this.logger.log(`Request received at: ${entryTime.toUTCString()}`);

    const sender = req.headers['x-sender'];
    const receiver = req.headers['x-receiver'];
    this.logger.log(`\nSender: ${sender}\nReceiver: ${receiver}`);

    res.on('finish', () => {
      const exitTime = new Date();
      this.logger.log(`Response sent at: ${exitTime.toUTCString()}`);
    });
    next();
  }
}
