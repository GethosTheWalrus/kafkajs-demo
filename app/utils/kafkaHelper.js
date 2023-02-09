const { Kafka, Partitioners } = require('kafkajs');
const { Config } = require('./config.js');

var kafka = new Kafka({
    clientId: 'kafka-nodejs-starter',
    brokers: Config.KafkaBrokerAddresses,
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

async function produceMessage(topic, messages) {
    // Connect to the producer
    await producer.connect()

    // Send an event to the demoTopic topic
    await producer.send({
        // topic: 'test', 
        topic: topic,
        messages: messages,
        // messages: [
        //     { 
        //         value: 'Hello micro-services world!' 
        //     },
        // ],
    })

    // Disconnect the producer once we're done
    await producer.disconnect();
}

var KafkaHelper = {
    producer: producer,
    createConsumer: createConsumer,
    produceMessage: produceMessage
};

module.exports = { KafkaHelper };