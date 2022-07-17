import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = (req: Request | any , res: Response, next: NextFunction): void => {
    try {
      res.render('home',{message: 'home'})
    } catch (error) {
      next(error);
    }
  };
  // login conroller
  public signIn = (req:Request, res: Response, next: NextFunction)=>{
    try{
      res.render('signIn')
    }catch(err){
      next(err)
    }
  }
  // signup controller
  public signUp = (req:Request, res: Response, next: NextFunction)=>{
    try{
      res.render('signUp')
    }catch(err){
      next(err)
    }
  }
  // newpost controller
  public newPost = (req:Request, res: Response, next: NextFunction)=>{
    try{
      res.render('newpost',{message:" "})
    }catch(err){
      next(err)
    }
  }
}

export default IndexController;
