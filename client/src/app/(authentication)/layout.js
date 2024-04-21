import { siteConfig } from '@/config/site';
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'


export const metadata = {
    title: {
        default: siteConfig.name,
        template: `%s · ${siteConfig.name}`
    },
    metadataBase: new URL(siteConfig.url),
    description: siteConfig.description,
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
      },
      manifest: `${siteConfig.url}/site.webmanifest`,
  };
  

export default async function AuthenticationLayout({
    children
}) {

    const supabase = createClient()

    const { data: { user }} = await supabase.auth.getUser()

    if (user) {
        redirect("/")
    }

  return (
    <React.Fragment>
        {children}
    </React.Fragment>
  )
}
