import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

export const GETgetMedia = (req: Request, res: Response) => {
  const filename = req.params.filename;
  const type = req.query.type;

  const mediaDir = path.join(__dirname, '../media', `${filename}`);

  if (type === 'download') {
    res.download(mediaDir);
  } else {
    res.sendFile(mediaDir);
  }
}