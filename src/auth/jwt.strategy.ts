import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly auth: AuthService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('token'),
            ignoreExpiration: false,
            secretOrKey: "nest-you",
        });
    }

    async validate(payload) {
        const user = await this.auth.validatePwd(payload.account, payload.token);
        if (!user) {
            Logger.error(payload, '-jwt验证失败');
            throw new UnauthorizedException({ status: 401, msg: "token失效！" });
        }

        return user
    }
}
