import { Queue } from "bullmq";
import { createClient } from 'redis';
import dotenv from "dotenv";
dotenv.config(); 

const client = createClient({
    username: 'default',
    password:  process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 15886
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('foo', 'bar');
const result = await client.get('foo');
console.log(result)  // >>> bar
export const imageQueue = new Queue("image-processing", {
    connection: {
        host:  process.env.REDIS_HOST,
        port: 15886,
        username: 'default',
        password:  process.env.REDIS_PASSWORD
    }
});

