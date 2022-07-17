import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import PostsController from '@/controllers/post.controller';

class IndexRoute implements Routes {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();
  public postController = new PostsController()

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
    this.router.get(`${this.path}login`, this.indexController.signIn)
    this.router.get(`${this.path}signup`, this.indexController.signUp)
    this.router.get(`${this.path}posts`, this.postController.getPosts)
    this.router.get(`${this.path}newpost`,authMiddleware, this.indexController.newPost)

  }
}

export default IndexRoute;
