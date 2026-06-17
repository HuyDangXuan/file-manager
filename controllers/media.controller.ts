import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

export const getMedia = (req: Request, res: Response) => {
  const filename = req.params.filename;

  const mediaDir = path.join(__dirname, '../media', `${filename}`);

  res.sendFile(mediaDir);
}