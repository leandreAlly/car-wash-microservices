import { BadRequestError } from 'error-ease';
import express, { Request, Response, NextFunction } from 'express';
import { ZodError, AnyZodObject } from 'zod';
import { formatZodError } from '../utils/formatZodError';

// ...
export const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: formatZodError(error) });
      }
      return res.status(500).json({ message: JSON.stringify(error) });
    }
  };
