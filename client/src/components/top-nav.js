import React from 'react'
import { Icons } from './icons/icons'
import { Button } from './ui/button'

export default function TopHeaderNav() {
  return (
    <>
    <nav className="w-full fixed top-0 z-50 bg-white border-b border-border2 h-[3.5rem] flex items-center ">
        <div className="w-full flex items-center justify-between px-2.5 py-3">
          <div className="mx-2.5 flex items-center">
            <div className="me-2"> 
              <Icons.logo  className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-semibold leading-3 tracking-tighter">notecraft</h1>
          </div>
          <div className="flex gap-4">
            <Button variant="secondary">Support</Button>
            <Button variant="secondary">Feedback</Button>
            <div className="flex items-center justify-center">
              <Icons.settings />
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
