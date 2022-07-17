import { Request } from 'express';
import { User } from '@interfaces/users.interface';

export interface DataStoredInToken {
  userId: number;
}

export interface TokenData {
  token: string;
}

export interface RequestWithUser extends Request {
  user: User;
}
