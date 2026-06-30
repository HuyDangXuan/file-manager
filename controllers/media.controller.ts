import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const mediaRoot = path.resolve(process.cwd(), 'media');

export const GETgetMedia = (req: Request, res: Response) => {
  const subPath = req.params.subPath;
  const type = req.query.type;

  const mediaDir = path.join(mediaRoot, ...subPath);

  if (type === 'download') {
    res.download(mediaDir);
  } else {
    res.sendFile(mediaDir);
  }
}