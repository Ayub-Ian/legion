import { Icons } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import UserFileUpload from "@/components/upload/upload";
import { createClient } from "@/lib/supabase/server";
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import React from "react";

export default async function UserHomePage() {
  const supabase = createClient()



  return (
    <>
      <nav className="w-full fixed top-0 z-50 bg-white border-b border-border2 h-[3.5rem] flex items-center ">
        <div className="w-full flex items-center justify-between px-2.5 py-3">
          <div className="mx-2.5">
            <h1 className="text-2xl">notecraft</h1>
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

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="flex flex-col w-full h-full justify-between">
          <div className="w-full">
            <ul className="flex flex-col ">


              <li class="group flex flex-row items-center gap-2 justify-left cursor-pointer rounded-e-lg px-2.5 me-2 py-2 relative overflow-visible h-10 hover:bg-gray-200 bg-white text-textGray">
                <div class="flex flex-row gap-2 items-center overflow-hidden flex-none w-full">
                  <div class="w-4 flex items-center justify-center">
                    <Icons.word className="h-5 w-5" />
                  </div>
                  <div class="flex flex-row">
                    <h2 class="text-sm font-medium text-left whitespace-nowrap overflow-hidden flex flex-row items-center gap-1 ">Welcome</h2>
                  </div>
                </div>
                <div class="w-10 h-full bg-gradient-to-l rounded-r-lg absolute right-0 group-hover:from-gray-200 from-white group-hover:right-8"></div>
              </li>

              <li class="group flex flex-row items-center gap-2 justify-left cursor-pointer rounded-e-lg px-2.5 me-2 py-2 relative overflow-visible h-10 hover:bg-gray-200 bg-white text-textGray">
                <div class="flex flex-row gap-2 items-center overflow-hidden flex-none w-full">
                  <div class="w-4 flex items-center justify-center">
                    <Icons.file className="h-5 w-5 " />
                  </div>
                  <div class="flex flex-row">
                    <h2 class="text-sm font-medium text-left whitespace-nowrap overflow-hidden flex flex-row items-center gap-1 ">Prompts to get you started and off your feet</h2>
                  </div>
                </div>
                <div class="w-10 h-full bg-gradient-to-l rounded-r-lg absolute right-0 group-hover:from-gray-200 from-white group-hover:right-0"></div>
              </li>

            </ul>
          </div>
          <div className="w-full mb-5">
            <div className="ms-5 me-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="hover:bg-gray-100 p-2 rounded-md cursor-pointer ">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                        <Icons.user className="text-white" />
                      </div>
                      <div className="flex flex-col items-start">
                        <p className="ext-sm font-medium text-left whitespace-nowrap">Ayub Ian</p>
                        <p className="text-xs font-medium text-gray-600"> iayub.mia@gmail.com</p>
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

      <main className="p-4 sm:ml-64">
        <div className="mt-14 h-full w-full flex flex-col">
          <div className="w-full h-full ">
            <div className=" w-full mx-auto max-w-2xl mt-16 mb-20 px-2">
              <div className="mb-8">
                <h2 className="text-4xl mb-1.5 font-bold">Hello, Ayub</h2>
              </div>

              <div className="flex flex-col gap-4">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                  <div className="flex flex-col items-start justify-between p-4 px-4 h-[9.5rem] rounded-xl border cursor-pointer flex-grow flex-basis-0 duration-150 ease-in transition-border border-border3 hover:border-textGray3 hover:scale-[1.015] shadow-feint">
                    <Icons.note />
                    <div>
                      <span className="block text-md font-semibold mb-0.5">
                        Write
                      </span>
                      <span className="block text-sm text-textGray">
                        Create a new note
                      </span>
                    </div>
                  </div>

                  <UserFileUpload />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
