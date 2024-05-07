import Sidebar from '@/components/sidebar'
import TopHeaderNav from '@/components/top-nav'
import { siteConfig } from '@/config/site'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'

export const metadata = {
    title: {
        default: siteConfig.name,
        template: `%s · ${siteConfig.name}`
    },
  };

export default async function AppLayout({ children }) {
    const supabase = createClient()

    const { data: { user }} = await supabase.auth.getUser()

    if (!user) {
        redirect("/login")
    }
    return (
        <>
            <TopHeaderNav />
            <Sidebar />
            <main className="p-4 sm:ml-64">
                <div className="my-auto h-full w-full flex flex-col">
                    {children}
                </div>
            </main>

        </>
    )
}
