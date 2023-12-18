import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import config from '../utils/config';

class AuthMiddleware {
  public verifyAccessToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(403).send('A token is required for authentication');
    }

    try {
      const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
      //@ts-ignore
      req.user = decoded;
    } catch (err) {
      return res.status(401).send('Invalid Token');
    }

    return next();
  };
}
export default new AuthMiddleware()