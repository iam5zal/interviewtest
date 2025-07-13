
'use client'

import { useState, useEffect } from 'react'
import SHA256 from 'crypto-js/sha256'
import { useRouter } from 'next/navigation'
import styles from './styles.module.scss'

export default function LoginForm() {
  const router = useRouter()
  const [step, setStep] = useState(0)   
  const [username, setUsername] = useState('')
  const [secureWord, setSecureWord] = useState('')
  const [timer, setTimer] = useState(0)
  const [password, setPassword] = useState('')
  const [mfaCode, setMfaCode] = useState('')
  const [devCode, setDevCode] = useState('')
  const [token, setToken] = useState('')
  const [error, setError] = useState('')

 
  useEffect(() => {
    if (step === 1 && timer > 0) {
      const id = setInterval(() => setTimer(t => t - 1), 1000)
      return () => clearInterval(id)
    }
  }, [step, timer])


  const DEV_CREDS = 'Use: username=aaa  password=111'


  const onUsername = async e => {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/getSecureWord', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    })
    const data = await res.json()
    if (!res.ok) return setError(data.error)
    setSecureWord(data.secureWord)
    setTimer(60)
    setStep(1)
  }


  const onPassword = async e => {
    e.preventDefault()
    setError('')
    const hashed = SHA256(password).toString()
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, secureWord, password: hashed })
    })
    const data = await res.json()
    if (!res.ok) return setError(data.error)
    setToken(data.token)
    setDevCode(data.mfaCode)
    setStep(3)
  }


  const onMfa = async e => {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/auth/verifyMfa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, code: mfaCode })
    })
    const data = await res.json()
    if (!res.ok) return setError(data.error)
    localStorage.setItem('token', token)
    router.push('/dashboard')
  }

  return (
    <div className={styles.container}>
      {step === 0 && (
        <form onSubmit={onUsername} className={styles.form}>
          <h2>Step 1: Username</h2>
          <p className={styles.dev}>{DEV_CREDS}</p>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required />
          <button type="submit">Get Secure Word</button>
        </form>
      )}

      {step === 1 && (
        <div className={styles.secure}>
          <h2>Step 2: Secure Word</h2>
          <p className={styles.word}>{secureWord}</p>
          <p>Expires in {timer}s</p>
          <button onClick={() => setStep(2)} disabled={timer <= 0}>
            Next
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      )}

      {step === 2 && (
        <form onSubmit={onPassword} className={styles.form}>
          <h2>Step 3: Password</h2>
          <p className={styles.dev}>{DEV_CREDS}</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required />
          <button type="submit">Login</button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      )}

      {step === 3 && (
        <form onSubmit={onMfa} className={styles.form}>
          <h2>Step 4: MFA Code</h2>
          <p className={styles.dev}>Dev code: {devCode}</p>
          <input
            type="text"
            placeholder="6-digit code"
            value={mfaCode}
            onChange={e => setMfaCode(e.target.value)}
            required />
          <button type="submit">Verify</button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      )}
    </div>
  )
}
