const { KafkaHelper } = require('./utils/kafkaHelper.js');
const { RabbitMQHelper } = require('./utils/rabbitmqHelper.js');

var express = require('express');
var app = express();

// Routes
app.use(require('./routes'));

// Invoke our kafka helper module
KafkaHelper.createConsumer(
    'test-group',
    ['test'],
    kafkaConsumerCallback
);

RabbitMQHelper.listenForMessages('hello');

function kafkaConsumerCallback(message) {
    console.log({value: message.value.toString()});
}

app.listen(3000);