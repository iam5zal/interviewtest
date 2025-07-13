
import { NextResponse } from 'next/server'

const MOCK_DATA = [
  {
    date: '24 Aug 2023',
    referenceId: '#834343434342',
    to: 'Bloom Enterprise Sdn Bhd',
    transactionType: 'DuitNow payment',
    amount: 'RM 1,200.00',
  },
  {
    date: '14 Jul 2023',
    referenceId: '#834343434342',
    to: 'Muhammad Andy Asmawi',
    transactionType: 'DuitNow payment',
    amount: 'RM 54,810.16',
  },
  {
    date: '12 Jul 2023',
    referenceId: '#834343434342',
    to: 'Utilities Company Sdn Bhd',
    transactionType: 'DuitNow payment',
    amount: 'RM 100.00',
  },
]

export async function GET() {
  return NextResponse.json(MOCK_DATA)
}
