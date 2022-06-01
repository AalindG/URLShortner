import crypto from 'crypto'
/**
 * encofing using MD5, picking up first 7 digits.
 * If they exist in the DB, then we pick the next 7 and so on.
 * once we're out of possible cases, we increase the number to 8.
 */

function encode(_string: string, startingIndex: number = 0, length: number = 7) {
  const res = crypto.createHash('md5').update(_string).digest('hex')
  return res.substring(startingIndex, (startingIndex + length))
}

export {
  encode
}
