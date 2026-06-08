import type { RequestHandler, Request, Response, NextFunction } from 'express';

export const catchErrors = (requestHandler: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      return await requestHandler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
