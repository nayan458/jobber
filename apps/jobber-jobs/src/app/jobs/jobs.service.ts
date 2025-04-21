import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  DiscoveredClassWithMeta,
  DiscoveryService,
} from '@golevelup/nestjs-discovery';
import { JOB_METADATA_KEY } from '../decorators/job.decorator';
import { AbstractJob } from './abstract.job';

@Injectable()
export class JobsService implements OnModuleInit {
  private jobs: DiscoveredClassWithMeta<AbstractJob>[] = [];

  constructor(private readonly discoveryService: DiscoveryService) {}

  async onModuleInit() {
    const providers = await this.discoveryService.providersWithMetaAtKey(
      JOB_METADATA_KEY
    );
    console.log(providers);
    // this.jobs = await this.discoveryService.providersWithMetaAtKey<AbstractJob>(
    //     JOB_METADATA_KEY
    // )
  }
}
