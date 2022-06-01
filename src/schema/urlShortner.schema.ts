import mongoose from "mongoose"
import Client from "./client.schema"

export interface IUrlShortner extends mongoose.Document {
  shortUrl: string,
  clientIdentifier: string,
  longUrl: string,
  hash: string
};


export const urlShortnerSchema = new mongoose.Schema({
  shortUrl: { type: String, required: true },
  clientIdentifier: { type: String, ref: Client },
  longUrl: { type: String, required: true },
  hash: { type: String, required: true, unique: true }
})


const UrlShortner = mongoose.model('UrlShortner', urlShortnerSchema)

export default UrlShortner
