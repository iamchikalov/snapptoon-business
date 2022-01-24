const generateId = require('nanoid/generate')
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function makeId() {
  return generateId(alphabet, 12)
}
