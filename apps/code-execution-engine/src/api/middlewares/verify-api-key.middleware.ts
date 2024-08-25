import { Request, Response, NextFunction } from 'express';

export function apiKeyMiddleware(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers['x-api-key'];
  const expectedApiKey = process.env.EXECUTION_API_KEY;

  console.log(apiKey);

  if (!apiKey || apiKey !== expectedApiKey) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
  }

  next();
}
