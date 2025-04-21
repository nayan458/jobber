import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Job } from './models/job.model';
import { JobsService } from './jobs.service';
import { ExecuteJobInput } from './dto/execute-job.input';

@Resolver()
export class JobResolver {
  constructor(private readonly jobService: JobsService) {}

  @Query(() => [Job], { name: 'jobs' })
  async getJobs() {
    return this.jobService.getJobs();
  }

  @Mutation(() => Job)
  async executeJob(@Args('executeJobInput') executeJobinput: ExecuteJobInput) {
    return this.jobService.executeJob(executeJobinput.name);
  }
}
