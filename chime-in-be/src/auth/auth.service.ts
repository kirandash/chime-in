import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Response, Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, response: Response) {
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() +
        Number(this.configService.getOrThrow('JWT_EXPIRATION')),
    );

    // payload that will be encoded on the jwt token
    // don't include sensitive information in the payload
    const tokenPayload: TokenPayload = {
      ...user,
      // toHexString() is used to convert the ObjectId to string
      _id: user._id.toHexString(),
    };

    // sign the token with the payload and the secret key
    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      // httpOnly is used to prevent the client side javascript from accessing the cookie
      httpOnly: true,
      expires,
    });
  }

  verifyWs(request: Request) {
    const cookies: string[] = request.headers.cookie.split('; ');
    const authCookie = cookies.find((cookie) =>
      cookie.startsWith('Authentication'),
    );
    const jwt = authCookie.split('Authentication=')[1];
    return this.jwtService.verify(jwt);
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}
