import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './auth.schema';
import { JwtModule } from '@nestjs/jwt';
const SECRET = "be91876bae3ef244f440bb36c77f97944f674c722547b27fcd8587aaacf48f11"

@Module({
  imports: [
    MongooseModule.forFeature([{name: Auth.name, schema: AuthSchema}]),
    JwtModule.register({
      global: true,
      secret: SECRET
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
