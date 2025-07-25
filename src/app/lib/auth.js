import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET || 'jwt-secret-key'


export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
}


export function verifyToken(token) {
  try { return jwt.verify(token, JWT_SECRET) }
  catch { return null }
}