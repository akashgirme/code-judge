import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class VerifyCallbackMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== process.env.EXECUTION_API_KEY) {
      throw new UnauthorizedException('Invalid API key');
    }

    next();
  }
}
