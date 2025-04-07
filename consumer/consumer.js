const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'demo-client',
    brokers: ['kafka:9092'],
    connectionTimeout: 3000,
});

const consumer = kafka.consumer({ groupId: 'demo-group' });

const run = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'demo-topics', fromBeginning: true });

    console.log('👂 Consumer is listening...');

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`📨 Received message: ${message.value.toString()} (key: ${message.key?.toString()})`);
        },
    });
};

run().catch(console.error);
