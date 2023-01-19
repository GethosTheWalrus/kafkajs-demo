To run:  
If you would like to run the demo application in your own CLI, modify /app/utils/config.js with appropriate values for the address of your Kafka and RabbitMQ instances

If you prefer to run the stack as is, in the root directory, run "docker-compose up -d" to start Kafka, RabbitMQ, and the demo application

Note: Before testing, make sure you create a Kafka topic using the Kafka CLI for your platform

To test:
1) from a terminal with curl installed, "curl localhost:3000/kafka/produce" or "curl localhost:3000/rabbitmq/produce"
2) observe the console output of the running node container
