import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
  extends ServerKafka
  implements OnModuleDestroy
{
  constructor() {
    super({
      client: {
        clientId: process.env.KAFKA_CLIENT_ID,
        brokers: [process.env.KAFKA_BROKER as string],
        sasl: {
          mechanism: process.env.KAFKA_SASL_MECHANISM as any,
          username: process.env.KAFKA_SASL_USERNAME as string,
          password: process.env.KAFKA_SASL_PASSWORD as string,
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
