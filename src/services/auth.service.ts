import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { EntityRepository, Repository } from 'typeorm';
import { SECRET_KEY } from '@config';
import { CreateUserDto } from '@dtos/users.dto';
import { UserEntity } from '@entities/users.entity';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { UserLoginDto } from '@/dtos/users-login.dto';

@EntityRepository()
class AuthService extends Repository<UserEntity> {
  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await UserEntity.findOne({ where: { username: userData.username } });
    if (findUser) throw new HttpException(409, `You're email ${userData.username} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserEntity.create({ ...userData, password: hashedPassword }).save();
    return createUserData;
  }

  public async login(userData: UserLoginDto): Promise<{ tokenData: TokenData; findUser: User,  isPasswordMatching:boolean}> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

    const findUser: User = await UserEntity.findOne({ where: { username: userData.username } });
    // if (!findUser) throw new HttpException(409, `You're email ${userData.username} not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    // if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

    const tokenData = this.createToken(findUser);

    return { tokenData, findUser, isPasswordMatching };
  }

  public createToken(user: User):  TokenData {
    const dataStoredInToken: DataStoredInToken = { userId: user.userId };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return {token: sign(dataStoredInToken, secretKey, { expiresIn })} ;
  }

}

export default AuthService;
