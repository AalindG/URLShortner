import EventEmitter from "events";
import { hSetAsync, client } from "./helpers/redis.helper";
import { getAllClients } from "./model/client";

const events = new EventEmitter()

events.on('populateRedis', async () => {
  try {
    console.log('Redis event.');
    await client.connect()
    const clients = await getAllClients()

    const redisHash = process.env.REDIS_CLIENT_MAP

    const redisData = clients.map(({ apiKey, clientIdentifier }) => ({ key: apiKey, value: clientIdentifier }))
    console.log('redisData: ', redisData);
    const promiseArray = redisData.map(({ key, value }) => hSetAsync(redisHash, key, value))

    await Promise.all(promiseArray).then(res => {
      console.log('Redis populated: ', res);
    })
  } catch (error) {
    console.log('Unable to populate redis.', error)
    throw error
  }
})

export default events
