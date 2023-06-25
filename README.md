# REDIS PRACTICAL EXAMPLE FOR NODE JS PROJECT



# SETUP

1. Install redis on docker, in this project we will use redis-stack that already include `redisInsight` as UI tools to view and manage data
    - navigate to redis-stack directory
    - open terminal and make sure you are inside the redis-stack directory
    - make sure your docker on you machine is up and running
    - run `docker-compose up -d`  
      - docker-compose -> to run docker compose
      - up -> this will get the redis-stack image and setup container
      - `-d` -> detach, this will make the container building process hidden from terminal
    - if the container up and running, try open `localhost:8001` from your browser to view redisInsight, this should be available if your setup are correct by following previous steps


2. run the servers
   1. server1.js :
        - this server serve for all caching and data storing example used by redis,
        - this server also serve as publisher for pub/sub case -> `/redis-publisher` for the endpoint
   2. server2.js: 
        - this server serve only as subscriber for pub/sub case -> `redis-subscriber` for the endpoint



3. run both server individually by opening 2 terminal
   1. first terminal run : `npm run start:server1`
   2. second terminal run: `npm run start:server2`



4. try testing pub sub
   1. just hit the endpoint `localhost:3001/redis-subscriber` to listen to any event published by publisher
   2. then hit the endpoint `localhost:3000/redis-publisher` to publish a message/event to the channel

5. modified the `channel` name or the `message` of the published event as you wish
6. see this reference for more information regarding usecase of redis : https://redis.io/docs/
