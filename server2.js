import  express from 'express'
import  cors from 'cors'
import { createClient } from 'redis';
const app = express()


app.use(express.json())
app.use(cors())

// redis initialization
const redisClient = createClient();
redisClient.on('error', err => console.log('Redis Client Error', err));

// redis subscriber
const subscriber = redisClient.duplicate();
subscriber.on('error', err => console.error(err))





app.get('/', (req,res) => {
    res.send('Hello from server 2')
})




app.get('/redis', async (req,res) => {
    
    try {
        // only connect to redis when want to use it
        await redisClient.connect();

        // redis pubsub

        // disconnect from redis after all operation
        await redisClient.disconnect();
    
        res.send('Redis test');
      } catch (error) {
        console.error('Error occurred during Redis operation:', error);
        res.status(500).send('Internal Server Error');
      }
})


app.get('/redis-subscriber', async (req, res) => {
    try {
        // Connect to Redis
        await subscriber.connect();


        await subscriber.subscribe('channel', (message) => {
        console.log(message); // 'message'
        });

  
      console.log('Subscriber connected and listening to channel');
  
      res.send('Redis subscriber');
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  });
  

app.listen(3001, () => {
    console.log('Server 2 running on port 3001')
})