import {  IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

}
