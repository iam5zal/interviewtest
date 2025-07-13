import { NextResponse } from 'next/server'
import { secureStore, credentialStore, mfaStore } from './../../../store/store'
import { hashPassword, generateMfaCode } from './../../../utils/crypto'
import { signToken } from '../../../lib/auth'

export async function POST(request) {
  const { username, password: hashedPwd, secureWord } = await request.json()
  const now = Date.now()


  const entry = secureStore.get(username)
  if (!entry ||
      entry.secureWord !== secureWord ||
      now - entry.issuedAt > 60_000
  ) {
    return NextResponse.json(
      { error: 'Invalid or expired secure word.' },
      { status: 400 }
    )
  }

  const expectedHash = credentialStore.get(username)
  if (!expectedHash || expectedHash !== hashedPwd) {
    return NextResponse.json(
      { error: 'Wrong username or password.' },
      { status: 401 }
    )
  }


  const token = signToken({ username })


  const code = generateMfaCode()
  mfaStore.set(username, { code, attempts: 0 })


  return NextResponse.json({ token, mfaCode: code })
}