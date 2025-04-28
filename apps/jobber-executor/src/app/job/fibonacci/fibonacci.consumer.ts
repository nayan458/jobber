import { Injectable, OnModuleInit } from '@nestjs/common';
import { PulsarClient, PulsarConsumer } from '@jobber/pulsar';
// import { Message } from "pulsar-client";
import { FibonacciData } from './fibonacci-data.interface';
import { iterate } from 'fibonacci';

@Injectable()
export class FibonacciConsumer
  extends PulsarConsumer<FibonacciData>
  implements OnModuleInit
{
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient, 'fibonacci');
  }

  protected async onMessage(
    // message: Message
    data: FibonacciData
  ): Promise<void> {
    // console.log('FibonacciConsumer.onMessage');
    const result = iterate(data.iterations);
    this.logger.log(result);
  }
}
