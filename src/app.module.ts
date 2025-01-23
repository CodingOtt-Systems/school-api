import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DashboardModule } from './dashboard/dashboard.module';
import { StudentModule } from './student/student.module';
import { PaymentModule } from './payment/payment.module';
import { TeacherModule } from './teacher/teacher.module';
import { ClassesModule } from './classes/classes.module';
import { SoundModule } from './sound/sound.module';
import { AuthModule } from './auth/auth.module';
import { DigitalOceanModule } from './digital-ocean/digital-ocean.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolModule } from './school/school.module';
import { MsgModule } from './msg/msg.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DB),
    DashboardModule, 
    StudentModule, 
    PaymentModule, 
    TeacherModule, 
    ClassesModule, 
    SoundModule,
    AuthModule, 
    DigitalOceanModule, 
    SchoolModule, 
    MsgModule
  ],
})
export class AppModule {}
