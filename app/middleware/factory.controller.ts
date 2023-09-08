import { Request, Response } from 'express';
import type { Controller } from '../@types/index.d.ts';

// factory design pattern
// it returns a middleware function

export default (controller: Controller) => (
  async (req: Request, res: Response, next: any) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  });
