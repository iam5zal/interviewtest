'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LoginForm from '../components/LoginForm'
import styles from './styles.module.scss'

export default function LoginPage() {
  const router = useRouter()
  const [creds, setCreds] = useState(null)


  async function handlePassword({ username, secureWord, hashed }) {

    console.log({ username, secureWord, hashed })

    router.push('/mfa')
  }

  return (
    <div className={styles.page}>
      <LoginForm onPasswordReady={handlePassword} />
    </div>
  )
}
