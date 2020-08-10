import { Injectable, UnauthorizedException, Logger, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encrypt } from "../utils/cryptogram";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    signToken(data: object) {
        const token = this.jwtService.sign({
            name: data['name'],
            token: encrypt(data['pwd'], data['name'])
        }, {
            // 过期时间
            expiresIn: 60,
        });
        return token
    }

    verify(token: string) {
        try {
            const data = this.jwtService.verify(token, { secret: "nest88829" });
            if (!data) throw new UnauthorizedException();
            return data
        } catch (error) {
            Logger.error('jwt token', error)
            return {
                status: 500,
                msg: "token 过期"
            }
        }

    }
}
