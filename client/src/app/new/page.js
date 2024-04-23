import { Icons } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import UserFileUpload from "@/components/upload/upload";
import { createClient } from "@/lib/supabase/server";
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
      ></aside>

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
