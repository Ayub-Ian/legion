import React from 'react'
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Icons } from './icons/icons'
import UserChatbotList from './chatbots/user-chatbot-list'


export default function Sidebar() {
  return (
    <>
     <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="flex flex-col w-full h-full justify-between">
          <div className="w-full">
            <UserChatbotList />
          </div>
          <div className="w-full mb-5">
            <div className="ms-5 me-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="hover:bg-gray-100 p-2 rounded-md cursor-pointer ">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                        <Icons.user className="text-white" />
                      </div>
                      <div className="flex flex-col items-start">
                        <p className="text-sm font-medium text-left whitespace-nowrap">Ayub Ian</p>
                        <p className="text-xs leading-normal text-content_color_secondary"> iayub.mia@gmail.com</p>
                      </div>
                    </div>
                  </div>

                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="center">

                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

            </div>

          </div>
        </div>
      </aside>
    </>
  )
}
