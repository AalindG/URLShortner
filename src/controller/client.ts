import { Request, Response, NextFunction } from 'express'
import * as ClientModel from '../model/client'

async function createClient(request: Request, response: Response, next: NextFunction) {
  const { clientName } = request.body
  // const { apiKey } = request.headers
  const result = await ClientModel.createClient({ clientName })
  response.status(200).json(result)
}

// async function generateUrl(request: Request, response: Response, next: NextFunction) {
//   const { longUrl } = request.body
//   const { apiKey } = request.headers

//   const result = await UrlShortnerModel.generateUrl({ longUrl, apiKey })
//   response.status(200).json(result)
// }

export {
  createClient
}
