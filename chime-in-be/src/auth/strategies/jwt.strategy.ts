import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
// Note: We want jwt strategy
import { Strategy, ExtractJwt } from 'passport-jwt';
import { TokenPayload } from '../token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      // jwtFromRequest is used to extract the jwt token from the request object
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          return req?.cookies?.Authentication;
        },
      ]),
      // secret key used to sign the jwt token
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }

  // passport will call this method to validate the jwt token and attach the payload to the request object
  async validate(payload: TokenPayload) {
    return payload;
  }
}
