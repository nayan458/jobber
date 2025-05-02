import { Module } from '@nestjs/common';
import { FibonacciJob } from './jobs/fibonacci/fibonacci.job';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { JobsService } from './jobs.service';
import { JobResolver } from './jobs.resolver';
import { join } from 'path';
import { AUTH_PACKAGE_NAME } from '@jobber/grpc';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PulsarModule } from '@jobber/pulsar';

@Module({
  imports: [
    DiscoveryModule,
    ClientsModule.register([
      {
        name: AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, '../../libs/grpc/proto/auth.proto'),
        },
      },
    ]),
    PulsarModule,
  ],
  providers: [FibonacciJob, JobsService, JobResolver],
})
export class JobModule {}
