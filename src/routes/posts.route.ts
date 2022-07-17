import upload from "@/middlewares/imageUpload.middleware";
import { Router } from "express";
import postsController from '../controllers/post.controller'
import authMiddleware from "@/middlewares/auth.middleware";
class PostRouter {
    public path = '/posts'
    public router = Router()
    public postsController = new postsController()
    constructor(){
        this.initialiseRoutes()
    }
    private initialiseRoutes(){
        this.router.get(`${this.path}`, this.postsController.getPosts)
        this.router.get(`${this.path}/:postId(\\d+)`,authMiddleware, this.postsController.findPostById)
        this.router.post(`${this.path}`,authMiddleware,upload.single('image'), this.postsController.createPost)
        this.router.delete(`${this.path}/:postId(\\d+)`,authMiddleware, this.postsController.deletePost)

    }
}

export default PostRouter





