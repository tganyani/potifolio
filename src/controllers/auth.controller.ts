import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import { UserLoginDto } from '@/dtos/users-login.dto';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request | any, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: UserLoginDto = req.body;
      const { tokenData, findUser, isPasswordMatching} = await this.authService.login(userData);
      if(isPasswordMatching){
        req.session.isLoggedIn = true
        req.session.userId = findUser.userId
        req.session.username = findUser.username
        req.session.token = tokenData.token
        // res.status(200).json({ data: findUser, message: 'login',cookie });
        res.redirect('/')
      }
      else{
      res.redirect('/login')
      }

    } catch (error) {
      // next(error);
      res.redirect('/signup')

    }
  };

  public logOut = async (req: Request | any, res: Response, next: NextFunction): Promise<void> => {
    try {
        req.session.destroy()
        res.redirect('/')
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
