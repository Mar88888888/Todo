import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from './dto/signup.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { JwtService } from '@nestjs/jwt';
const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  
  constructor(
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
  ) {}

  async create(userData: SignupDto): Promise<UserEntity> {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(userData.password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    userData.password = result;
    
    let user = this.userRepo.create(userData);

    return this.userRepo.save(user);
  }
  

  async login(loginData: {email: string, password: string}, user: UserEntity): Promise<String> {
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(loginData.password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid password');
    }
    const payload = { sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }


  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepo.findOne({ where: {email} });
  }


  async getMe(token: string): Promise<UserEntity> {
    const payload = this.jwtService.verify(token);
    return this.userRepo.findOne({where: { id: payload.sub } });
  }
}
