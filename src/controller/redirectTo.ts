import { Request, Response, NextFunction } from 'express'
import * as UrlShortnerModel from '../model/urlShortner'

async function redirectTo(request: Request, response: Response, next: NextFunction) {
  const { hash } = request.params
  console.log('rrrr:::', hash);

  const result = await UrlShortnerModel.redirectTo({ hash })
  // response.status(301).json(result)
  response.writeHead(301, {
    Location: result
  }).end();

}

export {
  redirectTo
}
