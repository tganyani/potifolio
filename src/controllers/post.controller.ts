import { Post } from '@/interfaces/post.interface'
import { NextFunction, Request, Response } from 'express'
import { request } from 'http'
import postServices from '../services/posts.services'

class PostsController {
    public postservice = new postServices()
    public getPosts =async (req: Request, res: Response, next: NextFunction) => {
        try{
            const findAllPosts: Post[] = await this.postservice.findAllPosts()
            res.render('posts',{posts:findAllPosts})
        }catch(err){
            next(err)
        }
    }
    public findPostById =async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId = Number(req.params.postId)
            const findOnePostData: Post = await this.postservice.findPostById(postId)
            res.status(200).json({
                data: findOnePostData,
                message: "Find post by Id"
            })
        } catch (err) {
            next(err)
        }
    }

    public createPost =async (req: Request | any, res: Response, next: NextFunction) => {
        try {
            const imageUrl = req.file.filename
            const userId = req.session.userId
            const postData = {...req.body,imageUrl,userId}
            const createdPost: Post = await this.postservice.createPost(postData)
            if(createdPost){
                res.render('newpost',{message:"Post successfully created"})
            }
            else{
                res.render('newpost',{"error":"Error while creating the post"})
            }
        } catch (err) {
            next(err)
        }
    }
    
    public deletePost =async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId = Number(req.params.postId)
            // const deletedPost: Post = await this.postservice.deletePost(postId)
            console.log(postId)
        } catch (err) {
            next(err)
        }
    }
}


export default PostsController




