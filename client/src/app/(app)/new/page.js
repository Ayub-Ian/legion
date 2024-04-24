import { Icons } from "@/components/icons/icons";
import UserFileUpload from "@/components/upload/upload";
import { createClient } from "@/lib/supabase/server";
import React from "react";

export const metadata = {
  title: "Home"
}

export default async function UserHomePage() {
  const supabase = createClient()

  return (
    <>
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

    </>
  );
}
