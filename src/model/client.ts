import { Client } from "../schema";
import crypto from 'crypto'

function generateApiKey(clientIdentifier: string): string {
  return clientIdentifier + '_' + crypto.randomUUID()
}


async function _generateClientIdentifier(clientName: string, startingIndex: number = 0): Promise<string> {
  const clientIdentifier: string = clientName.substring(startingIndex, (startingIndex + 3)).toUpperCase()

  const clientDetails = await Client.findOne({ clientIdentifier })

  if (clientDetails) {
    return _generateClientIdentifier(clientName, (startingIndex + 1))
  }
  return clientIdentifier
}

async function createClient(attrs: any) {
  const {
    clientName
  } = attrs

  const clientIdentifier = await _generateClientIdentifier(clientName)

  const apiKey = generateApiKey(clientIdentifier)

  const clientDetails = await Client.create({
    clientName,
    clientIdentifier,
    apiKey
  })

  return clientDetails

}

async function getAllClients() {
  const clientDetails = await Client.find({})
  if (clientDetails.length === 0) {
    throw new Error('No Clients Found.')
  }
  return clientDetails
}

export {
  createClient,
  getAllClients
}
