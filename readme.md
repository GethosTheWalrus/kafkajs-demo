To run:
1) in the root folder, "docker-compose up -d" to start a kafka demo
2) create a topic called "demoTopic" using the Kafka CLI
3) in the app folder, "npm install"
4) in the app folder, "node index.js"

To test:
1) from a terminal with curl installed, "curl localhost:3000/produce"
2) observe the console output of the running index.js
