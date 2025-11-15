'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [income, setIncome] = useState<any[] | null>(null)

  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          *,
          account:account_id (
            id,
            title,
            distribution_percentage
          ),
          user:user_id (
            id,
            first_name
          )      
        `)
        .gt('amount', 0);

      if (error) 
        console.error('Error fetching transactions:', error)

      setIncome(data)
    }
    getData()
    
  }, [])

  return <pre>{JSON.stringify(income, null, 2)}</pre>
}