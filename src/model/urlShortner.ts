import { UrlShortner, Client } from '../schema'
import { IClient } from '../schema/client.schema'
import { encode } from '../helpers'
import { IUrlShortner } from '../schema/urlShortner.schema'

async function _generateHash(longUrl: string, startingIndex: number = 0, length: number = 7): Promise<string> {
  const hash = encode(longUrl, startingIndex, length)

  const urlDetails = await UrlShortner.findOne({ hash }) || {}

  const { shortUrl: tinyUrl = '' } = urlDetails

  if (tinyUrl) {
    return _generateHash(longUrl, (startingIndex + 1), length)
  }

  return hash
}

async function getUrl(args: any): Promise<string> {

  const { apiKey, longUrl } = args

  const clientDetails: IClient = await Client.findOne({ apiKey }) as any

  const { clientIdentifier } = clientDetails

  const res = await UrlShortner.findOne({
    clientIdentifier,
    longUrl
  })

  return res.shortUrl
}

async function redirectTo(args: any): Promise<string> {
  const { hash } = args

  const urlShortnerData = await UrlShortner.findOne({
    hash
  }) || {}

  const { longUrl = '' } = urlShortnerData

  if (!longUrl) {
    return ''
  }
  return longUrl
}


async function generateUrl(args: any): Promise<IUrlShortner> {
  const { apiKey, longUrl } = args

  const clientDetails: IClient = await Client.findOne({ apiKey }) as any

  const { clientIdentifier } = clientDetails

  const urlShortnerData = await UrlShortner.findOne({
    clientIdentifier,
    longUrl
  })

  if (urlShortnerData) {
    return urlShortnerData
  }

  const hash = await _generateHash(longUrl)

  const server = process.env.SERVER_HOST

  const insertObject = {
    shortUrl: `${server}/${hash}`,
    clientIdentifier,
    longUrl,
    hash
  }

  const response = await UrlShortner.create(insertObject)

  return response
}


export {
  getUrl,
  generateUrl,
  redirectTo
}
