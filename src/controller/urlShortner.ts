import { Request, Response, NextFunction } from 'express'
import * as UrlShortnerModel from '../model/urlShortner'

async function getUrl(request: Request, response: Response, next: NextFunction) {
  const { longUrl, apiKey } = request.body
  // const { apiKey } = request.headers
  // const apiKey = request.get('apiKey')

  const tinyUrl = await UrlShortnerModel.getUrl({ longUrl, apiKey })


  response.status(200).json({ tinyUrl })
}

async function generateUrl(request: Request, response: Response, next: NextFunction) {
  const { longUrl, apiKey } = request.body
  // const { apiKey } = request.headers

  // const apiKey = request.get('apiKey')

  const result = await UrlShortnerModel.generateUrl({ longUrl, apiKey })

  if (!result) {
    response.status(404).send('Url not found')
  }

  response.status(301).json(result)
}

export {
  getUrl,
  generateUrl,
}
