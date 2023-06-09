import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { User } from '../../common/entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest: JwtStrategy.extractAccessTokenFromCookies,
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_ACCESS_SECRET'),
        });
    }

    async validate(payload: { sub: string }): Promise<User> {
        const { sub: uid } = payload;
        return this.authService.validateAccessToken(uid);
    }

    private static extractAccessTokenFromCookies(req: Request): string | null {
        if (req.cookies && req.cookies['access-token']) {
            return req.cookies['access-token'];
        }

        return null;
    }
}
