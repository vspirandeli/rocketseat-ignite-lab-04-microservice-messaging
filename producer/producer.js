import 'dotenv/config';
import { Kafka } from 'kafkajs';
import { randomUUID } from 'node:crypto';

async function bootstrap() {
  const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
        brokers: [process.env.KAFKA_BROKER],
        sasl: {
          mechanism: process.env.KAFKA_SASL_MECHANISM,
          username: process.env.KAFKA_SASL_USERNAME,
          password: process.env.KAFKA_SASL_PASSWORD,
        },
    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();
  await producer.send({
    topic: process.env.KAFKA_TOPIC,
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação via KAFKA',
          category: 'social',
          recipientId: randomUUID(),
        })
      }
    ]
  });

  await producer.disconnect();
}

bootstrap();