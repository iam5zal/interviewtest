
import crypto from 'crypto'


const SECURE_SECRET = process.env.SECURE_WORD_SECRET || 'super-secret-key'

export function generateSecureWord(username) {
  return crypto
    .createHmac('sha256', SECURE_SECRET)
    .update(username + Date.now())
    .digest('hex')
    .slice(0, 6)
}


export function hashPassword(password) {
  return crypto
    .createHash('sha256')
    .update(password)
    .digest('hex')
}

export function generateMfaCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}