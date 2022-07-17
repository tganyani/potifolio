import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDTO {
    @IsNotEmpty()
    @IsString()
    public description: string
    
    @IsNotEmpty()
    @IsString()
    public userId: number | string

}
