import { NextFunction, Response, Request } from "express";
import { client, hGetAsync } from "../helpers/redis.helper";

async function verifyClient(request: Request, response: Response, next: NextFunction) {
  // await client.connect()
  const apiKey = request.get('apiKey')

  const clientIdentifier = await hGetAsync(process.env.REDIS_CLIENT_MAP, apiKey)

  if (!clientIdentifier) {
    const error = new Error('Client not authorised')
    next(error)
  }

  request.body.clientIdentifier = clientIdentifier
  request.body.apiKey = apiKey
  next()
}

export { verifyClient }
