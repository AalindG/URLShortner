import express, { Express, NextFunction, Request } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import helmet from 'helmet'

import { urlRouter, client } from './routes'
import mongoose from 'mongoose'
import redirectToRouter from './routes/redirectTo'
import events from './events.helper'
import { verifyClient } from './middlewares/authorizeAndFetchClientData'

dotenv.config()

const PORT: string = process.env.PORT || ''

const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/url-shortner', verifyClient, urlRouter)
app.use('/client', client)
app.use('/', redirectToRouter)

app.listen(PORT, async () => {
  const { MONGO_DBNAME, MONGO_HOSTS } = process.env
  await mongoose.connect(`mongodb://${MONGO_HOSTS}/${MONGO_DBNAME}`)
    .then(() => {
      console.log('Connected to DB.');
    })
  events.emit('populateRedis')
  console.log(`Server Started at ${PORT}`);
})
