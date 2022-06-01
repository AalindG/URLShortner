import mongoose from "mongoose";

export interface IClient {
  clientIdentifier: string,
  clientName: string,
  apiKey: string,
  createdAt: string,
  updatedAt: string
};


export const clientSchema = new mongoose.Schema({
  clientIdentifier: { type: String, required: true },
  clientName: { type: String, required: true },
  apiKey: { type: String, required: true }
}, { timestamps: true })

const Client = mongoose.model<IClient>('Client', clientSchema)

export default Client
