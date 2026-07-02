import { NextFunction, Request, Response } from 'express';

const allowedOrigins = [
  process.env.DOMAIN
].filter(Boolean) as string[];

export const domainMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const referer = req.headers.referer;
  
  const isAllowed = referer && allowedOrigins.some((origin) => referer.startsWith(origin));
  
  if (isAllowed) {
    next();
    return;
  }

  res.json({
    code: "error",
    message: 'Không có quyền truy cập.' 
  });
}