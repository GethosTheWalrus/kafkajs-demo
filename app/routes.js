const { KafkaHelper } = require('./utils/kafkaHelper.js');
const { RabbitMQHelper } = require('./utils/rabbitmqHelper.js');

var express = require('express');
var router = express.Router();

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


router.get('/', function(req, res){
    res.send("Hello world!");
});
 
router.get('/kafka/produce', async (req, res) => {
    // Connect to the producer
    await KafkaHelper.producer.connect()

    // Send an event to the demoTopic topic
    await KafkaHelper.producer.send({
        topic: 'test', 
        messages: [
            { 
                value: 'Hello micro-services world!' 
            },
        ],
    })

    // Disconnect the producer once we're done
    await KafkaHelper.producer.disconnect();
    res.send('message sent to Kafka')
});

router.get('/rabbitmq/produce', (req, res) => {
    RabbitMQHelper.sendMessage('hello', 'Hello RabbitMQ!');
    res.send('message sent to RabbitMQ');
});

module.exports = router;