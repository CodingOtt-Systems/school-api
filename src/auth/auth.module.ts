import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './auth.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Auth.name, schema: AuthSchema}]),
    JwtModule.register({
      global: true,
      secret: 'sfsdfadsfds'
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
