
'use client'

import { useEffect, useState } from 'react'
import { useRouter }          from 'next/navigation'
import axios                  from 'axios'
import styles                 from './styles.module.scss'
import Link from 'next/link'

export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [history, setHistory] = useState([])
  const [error, setError]     = useState('')


  useEffect(() => {
    const t = localStorage.getItem('token')
    if (!t) return router.replace('/login')
    fetchHistory()
  }, [router])

 
  async function fetchHistory() {
    try {
      const { data } = await axios.get('/api/transaction-history')
      setHistory(data)
    } catch (err) {
      setError('Failed to load transactions.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading transactions…</p>
  }

  return (
    <div className={styles.container}>
       <Link href="/">Back</Link>
       
      <h1>Transaction History</h1>
     
      {error && (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      )}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Reference ID</th>
              <th>To</th>
              <th>Transaction Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {history.map((tx, i) => (
              <tr key={i}>
                <td>{tx.date}</td>
                <td>{tx.referenceId}</td>
                <td>{tx.to}</td>
                <td>{tx.transactionType}</td>
                <td>{tx.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
