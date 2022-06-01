import express from 'express'

const urlRouter = express.Router()

import * as UrlShortner from '../controller/urlShortner'

urlRouter.post('/get', UrlShortner.getUrl)
urlRouter.post('/generate', UrlShortner.generateUrl)

export default urlRouter
