const { Kafka, Partitioners } = require('kafkajs');

var kafka = new Kafka({
    clientId: 'kafka-nodejs-starter',
    brokers: ['localhost:9092'],
});

var producer = kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner, 'debug': 'all' });

var consumers = [];

async function createConsumer(groupId, topics, action) {
    let consumer = kafka.consumer({ groupId: groupId});
    // connect consumer
    await consumer.connect()

    // subscribe to topics
    await consumer.subscribe({ topics: topics })

    // run the consumer and listen for messages
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            action(message);
        },
    })

    consumers.push(consumer);
}

var KafkaHelper = {
    producer: producer,
    createConsumer: createConsumer
}

module.exports = { KafkaHelper }