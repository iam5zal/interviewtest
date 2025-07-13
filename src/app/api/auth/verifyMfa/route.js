import { NextResponse } from 'next/server'
import { mfaStore } from './../../../store/store'

export async function POST(request) {
  const { username, code } = await request.json()
  const entry = mfaStore.get(username)

  if (!entry) {
    return NextResponse.json(
      { error: 'No MFA session. Please login again.' },
      { status: 400 }
    )
  }
  if (entry.attempts >= 3) {
    return NextResponse.json(
      { error: 'Too many attempts. Locked out.' },
      { status: 429 }
    )
  }
  if (entry.code !== code) {
    entry.attempts += 1
    return NextResponse.json(
      { error: 'Invalid MFA code.' },
      { status: 401 }
    )
  }

  mfaStore.delete(username)
  return NextResponse.json({ success: true })
}