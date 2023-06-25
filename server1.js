import  express from 'express'
import  cors from 'cors'
import { createClient } from 'redis';
const app = express()


// express middleware
app.use(express.json())
app.use(cors())


// redis initialization
const redisClient = createClient();
redisClient.on('error', err => console.log('Redis Client Error', err));



app.get('/', (req,res) => {
    res.send('Hello from server 1')
})

app.get('/redis', async (req,res) => {
    
    try {
        // only connect to redis when want to use it
        await redisClient.connect();

        // set new key
        // await redisClient.set('firstKey', 'hallo');
        // await redisClient.set('secondKeye', 'guys');


        // set hash
        await redisClient.HSET('keys', 'field', 'value');
        const hash = await redisClient.HGETALL('keys');

        // get value from redis by key
        // const first = await redisClient.get('firstKey');
        // const second = await redisClient.get('secondKeye');


        // log value from redis
        // console.log(first);
        // console.log(second);
        console.log(hash);

        // disconnect from redis after all operation
        await redisClient.disconnect();
    
        res.send('Redis test');
      } catch (error) {
        console.error('Error occurred during Redis operation:', error);
        res.status(500).send('Internal Server Error');
      }
})


app.get('/redis-publisher', async (req, res) => {
    try {
      await redisClient.connect();
  
      // Publish event to Redis
      // will return 1 if the message subscribed
      // must have subsciber to listen first
    const check = await redisClient.publish('channel', 'Hello');
    console.log('published message', check) 



      res.send('Redis publisher');
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    } finally {
      await redisClient.disconnect();
    }
  });
  

app.listen(3000, () => {
    console.log('Server 1 running on port 3000')
})