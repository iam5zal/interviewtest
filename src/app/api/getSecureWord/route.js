import { NextResponse } from 'next/server'
import { secureStore, rateLimitStore } from './../../store/store'
import { generateSecureWord } from './../../utils/crypto'

export async function POST(request) {
  const { username } = await request.json()
  const now = Date.now()


  const last = rateLimitStore.get(username) || 0
  if (now - last < 10_000) {
    return NextResponse.json(
      { error: 'Too many requests. Try again in 10s.' },
      { status: 429 }
    )
  }
  rateLimitStore.set(username, now)


  const secureWord = generateSecureWord(username)
  secureStore.set(username, { secureWord, issuedAt: now })

  return NextResponse.json({ secureWord })
}