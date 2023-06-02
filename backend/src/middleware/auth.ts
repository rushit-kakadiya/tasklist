import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const SECRET_KEY: Secret = process.env.JWT_SECRET_KEY || 'jkasdhidyq9ehiug87asgd812yebHGJDGSqw89egs';
export interface CustomRequest extends Request {
  token: JwtPayload | string;
}

export const generateToken = async (params = {}) => {
  const token = jwt.sign(params, SECRET_KEY, { expiresIn: '1d' });
  return token;
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();

    const decoded = jwt.verify(token, SECRET_KEY);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Please authenticate' });
  }
};
