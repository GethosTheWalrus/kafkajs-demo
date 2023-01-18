const { KafkaHelper } = require('./utils/kafkaHelper.js');

var express = require('express');
var app = express();

// Routes
app.use(require('./routes'));

// Invoke our helper module
KafkaHelper.createConsumer(
    'test-group',
    ['test'],
    consumerCallback
);

// this is what the consumer will do when a mesage is sent to
// a topic that it is subscribed to
function consumerCallback(message) {
    console.log({value: message.value.toString()});
}

app.listen(3000);