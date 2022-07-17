import {  EntityRepository, Repository } from "typeorm";
import { CreatePostDTO } from "@/dtos/posts.dto";
import { Post } from "@/interfaces/post.interface";
import { PostEntity } from "@/entities/posts.entity";
import { UserEntity } from "@/entities/users.entity";
import { HttpException } from "@/exceptions/HttpException";

@EntityRepository()
class PostServices extends Repository <PostEntity> {
    public async findAllPosts():Promise<Post[]>{
        const posts: Post[] = await PostEntity.find()
        return posts
    }

    public async findPostById(postId: number):Promise<Post>{

        const findPost: Post = await PostEntity.findOne({
            where:{
                postId
            }
        })
        if(!findPost) throw new HttpException(409, 'Post not found')
        return findPost
    }

    public async createPost(post: Post):Promise<Post>{
        const createdPost = await PostEntity.create(post).save()
        return createdPost
    }

    public async deletePost(postId: number):Promise<Post>{
        const findPost: Post = await PostEntity.findOne({
            where:{
                postId
            }
        })
        await PostEntity.delete({postId: postId})
        return findPost
    }
}

export default PostServices



