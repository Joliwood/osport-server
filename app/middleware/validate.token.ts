import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AuthorizationError from '../helpers/errors/unauthorized.error.js';

const { verify } = jwt;

const validateToken = (req: Request, _res: Response, next: NextFunction) => {
  let token: string = '';

  if (req.cookies && req.cookies.accessToken) token = req.cookies.accessToken;

  verify(token, process.env.JWT_TOKEN_KEY as string, (err, decoded) => {
    if (err) next(new AuthorizationError('Unauthorized user'));
    req.body.decoded = decoded;
    next();
  });
};

export default validateToken;
