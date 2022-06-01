import express from 'express'

const urlRouter = express.Router()

import * as Client from '../controller/client'

const { createClient } = Client

urlRouter.post('/create', createClient)
// urlRouter.post('/generate', UrlShortner.generateUrl)

export default urlRouter
