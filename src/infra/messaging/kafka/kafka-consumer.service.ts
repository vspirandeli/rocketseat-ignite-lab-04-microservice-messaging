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
        clientId: 'notifications',
        brokers: ['rare-grackle-13917-us1-kafka.upstash.io:9092'],
        sasl: {
          mechanism: 'scram-sha-256',
          username:
            'cmFyZS1ncmFja2xlLTEzOTE3JArZgfaLd9zOoPzxoJKWaBN7E7NKtQ-tgDpqFgI',
          password: '3ed8d35cd8634552b7dd7be21fe70405',
        },
        ssl: true,
      },
    });
  }

  async onModuleDestroy() {
    await this.close();
  }
}
