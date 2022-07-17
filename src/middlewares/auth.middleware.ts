import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';

const authMiddleware = async (req: RequestWithUser | any, res: Response, next: NextFunction) => {
  try {
    const token = req.session.token
    if (token) {
      const secretKey: string = SECRET_KEY;
      const { userId } = (await verify(token, secretKey)) as DataStoredInToken;
      const findUser = await UserEntity.findOne(userId, { select: ['userId', 'username'] });
      if (findUser) {
        req.user = findUser;
        next();
      } else {
        res.redirect('/login')
      }
    } else {
      res.redirect('/login')
    }
  } catch (error) {
   res.redirect('/login')
  }
};




export default authMiddleware;
