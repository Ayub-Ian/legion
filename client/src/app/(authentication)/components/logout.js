"use client"
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function UserLogoutButton() {

    const supabase = createClient()
    const router = useRouter()

    const handleLogout = async () => {
        try {
            
          const { error } = await supabase.auth.signOut()
          router.push('/login')

          if (error) {
            toast.error("Something went wrong. Try again later.")
            console.error("Error:", {error})
          }
        } catch (error) {
            console.error({error})
        }

    }
  return (
    <>
    <Button onClick={handleLogout}>
        Logout
    </Button>
    </>
  )
}
