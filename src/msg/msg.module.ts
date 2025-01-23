import { forwardRef, Module } from '@nestjs/common';
import { MsgService } from './msg.service';
import { MsgController } from './msg.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule)
  ],
  providers: [MsgService],
  controllers: [MsgController],
  exports: [MsgService]
})
export class MsgModule {}
