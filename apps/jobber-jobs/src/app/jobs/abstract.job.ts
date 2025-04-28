import { Producer } from 'pulsar-client';
import { PulsarClient } from '@jobber/pulsar';
import { serialize } from '@jobber/pulsar';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export abstract class AbstractJob<T extends object> {
  private producer: Producer;
  protected abstract messageClass: new () => T;

  constructor(private readonly pulsarClient: PulsarClient) {}

  async execute(data: T, job: string) {
    this.vaidateData(data);

    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(job);
    }

    await this.producer.send({
      // data: Buffer.from(JSON.stringify(data))
      data: serialize(data),
    });
  }

  private async vaidateData(data: T) {
    const errors = await validate(plainToInstance(this.messageClass, data));
    if (errors.length) {
      throw new BadRequestException(`Job is invalid ${JSON.stringify(errors)}`);
    }
  }
}
