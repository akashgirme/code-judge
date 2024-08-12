import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class VerifyCallbackMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    const validApiKey = process.env.EXECUTION_SERVER_API_KEY;

    if (apiKey !== validApiKey) {
      throw new UnauthorizedException(
        'Invalid API Key',
        'Required Valid API Key to access this resource'
      );
    }

    next();
  }
}
