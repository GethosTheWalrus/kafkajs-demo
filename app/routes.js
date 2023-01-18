const { KafkaHelper } = require('./utils/kafkaHelper.js');

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
 
router.get('/produce', async (req, res) => {
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
    res.send('message sent')
})

module.exports = router;