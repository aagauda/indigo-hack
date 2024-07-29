import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('signin')
  async login(
    @Body() body: LoginDto
  ) {
    try {
      const loggedInUser = await this.authService.login(body);
  
      return {
        statusCode: HttpStatus.OK,
        data: loggedInUser,
        message: "Authentication Successfull"
      };
    } catch (error) {
      throw error;
    }
  }


  @Post('signup')
  async signup(
    @Body() body: RegisterDto
  ) {
    try {
      const signedUpUser = await this.authService.signup(body);
      return {
        statusCode: HttpStatus.OK,
        data: signedUpUser,
        message: "Signup Success"
      }
    } catch (error) {
      throw error
    }
  }



}
