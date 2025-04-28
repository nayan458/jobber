import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import {
  DiscoveredClassWithMeta,
  DiscoveryService,
} from '@golevelup/nestjs-discovery';
import { JOB_METADATA_KEY } from './decorators/job.decorator';
import { AbstractJob } from './jobs/abstract.job';
import { JobMetadata } from './interfaces/job-metadata.interface';

@Injectable()
export class JobsService implements OnModuleInit {
  // private jobs: DiscoveredClassWithMeta<AbstractJob>[] = []; // updated 2
  private jobs: DiscoveredClassWithMeta<JobMetadata>[] = [];
  //

  constructor(private readonly discoveryService: DiscoveryService) {}

  async onModuleInit() {
    // updated 1
    // const providers = await this.discoveryService.providersWithMetaAtKey(
    //   JOB_METADATA_KEY
    // );
    // console.log(providers);
    // this.jobs = await this.discoveryService.providersWithMetaAtKey<AbstractJob>(
    this.jobs = await this.discoveryService.providersWithMetaAtKey<JobMetadata>(
      JOB_METADATA_KEY
    );
  }

  getJobs() {
    return this.jobs.map((job) => job.meta);
  }

  async executeJob(name: string, data: object) {
    const job = this.jobs.find((job) => job.meta.name === name);
    if (!(job.discoveredClass.instance instanceof AbstractJob)) {
      throw new InternalServerErrorException(`
        Job with name ${name} is not an instance of AbsyractJob`);
    }
    await job.discoveredClass.instance.execute(data, job.meta.name);
    return job.meta;
  }
}
