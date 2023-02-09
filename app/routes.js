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
    KafkaHelper.produceMessage('test', [{value: 'Hello Kafka!'}]);
    res.send('message sent to Kafka');
});

router.get('/rabbitmq/produce', (req, res) => {
    RabbitMQHelper.sendMessage('hello', 'Hello RabbitMQ!');
    res.send('message sent to RabbitMQ');
});

module.exports = router;