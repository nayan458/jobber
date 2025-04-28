import { Consumer, Message } from 'pulsar-client';
import { PulsarClient } from './pulsar.client';
import { Logger } from '@nestjs/common';
import { deserialize } from './serialize';

export abstract class PulsarConsumer<T> {
  //  implements OnModuleInit
  private consumer!: Consumer;
  protected readonly logger = new Logger(this.topic);

  constructor(
    private readonly pulsarClient: PulsarClient,
    private readonly topic: string
  ) {}

  async onModuleInit() {
    this.consumer = await this.pulsarClient.createConsumer(
      this.topic,
      // this.onMessage.bind(this)
      this.listener.bind(this)
    );
  }

  private async listener(message: Message) {
    try {
      const data = deserialize<T>(message.getData());
      this.logger.debug(`Recived message ${JSON.stringify(data)}`);
      await this.onMessage(data);
    } catch (err) {
      this.logger.error(err);
    } finally {
      // await this.acknowledge(message);
      await this.consumer.acknowledge(message);
    }
  }

  // protected async acknowledge(message: Message) {
  //   await this.consumer.acknowledge(message);
  // }

  protected abstract onMessage(
    // message: Message
    data: T
  ): Promise<void>;
}
