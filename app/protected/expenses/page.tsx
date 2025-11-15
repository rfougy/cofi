'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [expenses, setExpenses] = useState<any[] | null>(null)

  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        account:account_id (
          id,
          title
        ),
        user:user_id (
          id,
          first_name
        )      
      `)
      .lt('amount', 0);

      if (error) 
        console.error('Error fetching transactions:', error)

      setExpenses(data)
    }
    getData()
    
  }, [])

  return <pre>{JSON.stringify(expenses, null, 2)}</pre>
}