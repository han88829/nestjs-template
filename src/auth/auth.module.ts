import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from "../models/user/user.module";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    // forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: "nest-you",
      signOptions: { expiresIn: 60 * 60 },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [],
})
export class AuthModule { }
