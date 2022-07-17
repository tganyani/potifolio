import { Post } from "@/interfaces/post.interface";
import { IsNotEmpty } from "class-validator";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";


@Entity()
export class PostEntity extends BaseEntity implements Post {
    @PrimaryGeneratedColumn()
    postId: number 

    @Column()
    @IsNotEmpty()
    userId: number

    @Column()
    @IsNotEmpty()
    description: string;

    @Column()
    @IsNotEmpty()
    imageUrl: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

}




