import { Injectable, NotFoundException, UnauthorizedException,BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnyBulkWriteOperation, Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  private readonly jwtSecret = "setnest";
  // private readonly tokenExpiry = '1h';

  async generateToken(userId: string,email:string) {
    // put the secret key in env of aws lambda
    const token = await jwt.sign({ id: userId,email:email }, this.jwtSecret,
      // { expiresIn: this.tokenExpiry }
    );
    return token;
  }



  async login(data:LoginDto) {
    try {

      const user = await this.userModel.findOne({
        email: data.email
      })

      if (!user) {
        throw new NotFoundException('Customer not found please register');
      }

      const isMatch = await bcrypt.compare(data.password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid Password')
      }
      const token = await this.generateToken(user.id,user.email);

      const { password, ...others } = user.toObject();
      return { ...others, token };
    } catch (error) {
      throw error
    }
  }


  async signup(data: RegisterDto) {
    try {
      const user = await this.userModel.findOne({
        email: data.email
      })

      if (user) {
        throw new BadRequestException ('Customer already exists');
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const { password, ...others } = data;
      const newUser = await this.userModel.create({
        ...others,
        password: hashedPassword,
      });

      const token = await this.generateToken(newUser.id,newUser.email);

      return { ...others, token };
    } catch (error) {
      throw error
    }
  }





}
