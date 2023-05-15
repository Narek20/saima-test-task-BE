import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { IExtendedRequest } from '../types/interfaces/request.interface';
import env from '../utils/constants/env';

export const verifyToken = (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    if (typeof token === 'string' && env.tokenKey) {
      const decoded = jwt.verify(token, env.tokenKey);
      req.decodedToken = decoded;
      next();
    }
  } catch (error) {
    return res.status(400).send('Invalid token');
  }
};
