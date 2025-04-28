import { Module } from '@nestjs/common';
import { JobModule } from './job/job.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [JobModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
