import { Icons } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import UserFileUpload from "@/components/upload/upload";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import React from "react";


export const metadata = {
  title: "Home"
}



export default async function UserHomePage() {

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data } = await supabase.auth.getSession()



 

  return (
    <>
      <div className="w-full h-full ">
        <div className=" w-full mx-auto max-w-2xl mt-16 mb-20 px-2">
          <div className="flex flex-col">
            <h2 className="text-lg mb-1.5 font-semibold -tracking-wide">Get started</h2>
          <div className="flex mt-6 justify-start items-stretch flex-col gap-4">
            <div className="flex justify-start items-center min-w-[auto]">
              <div className="mr-4 min-h-10 min-w-10 flex items-center justify-center rounded-md bg-base_color_brand/20">
                <Icons.write className="text-base_color_brand" />
              </div>
              <div className="mr-4 flex flex-col justify-start items-stretch">
                <h4 className="mb-1 font-medium text-sm">Create a new note</h4>
                <span className="text-xs leading-relaxed text-content_color_secondary">Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</span>
              </div>
              <Button variant={"outline"}>
                New Note
              </Button>
            </div>
            <div className="flex justify-start items-center min-w-[auto] py-2.5 border-t border-border_color_default">
              
              <div className="mr-4 min-h-10 min-w-10 flex items-center justify-center rounded-md bg-base_color_brand/20">
                <Icons.download className="text-base_color_brand" />
              </div>
              <div className="mr-4 flex flex-col justify-start items-stretch ">
                <h4 className="mb-1 font-medium text-sm">Import files and collections</h4>
                <span className="text-xs leading-relaxed text-content_color_secondary">
                Easily import your existing document collections, files, folders or URLs. Supported formats include .pdf only.
                </span>
              </div>
              <UserFileUpload userId={user.id} token={data?.session.access_token} />
            </div>
          </div>
          </div>

          <div className="flex flex-col pt-4 pb-12 justify-start items-stretch">
            <div className="flex flex-col justify-start items-stretch pb-6">
            <h2 className="text-lg mb-1.5 font-semibold -tracking-wide">Discover what you can do with Notecraft</h2>
            <span className="text-xs leading-relaxed text-content_color_secondary">
            Explore the full potential of Notecraft with getting started templates.
                </span>
           
            </div>
            <div className="flex flex-wrap items-stretch justify-between gap-6">
              <div className="flex flex-1 h-48">
                <div className="border border-border_color_default rounded-md p-1 min-w-56 cursor-pointer ">
                  <div className="p-5 flex flex-col min-w-[auto] justify-start items-stretch flex-auto">
                    <div className="flex pb-2 justify-start items-stretch">
                      <span className="flex justify-center items-center rounded-md bg-background_color_secondary p-2 h-12 w-12">
                        <Icons.rocket />
                      </span>
                    </div>
                    <div className="flex flex-col justify-start items-stretch">
                    <h4 className="mb-1 font-medium text-sm">Basics</h4>
                <span className="text-xs leading-relaxed text-content_color_secondary">
                Get up to speed with testing REST APIs on Postman.                </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 h-48">
                <div className="border border-border_color_default rounded-md p-1 min-w-56 cursor-pointer ">
                  <div className="p-5 flex flex-col min-w-[auto] justify-start items-stretch flex-auto">
                    <div className="flex pb-2 justify-start items-stretch">
                      <span className="flex justify-center items-center rounded-md bg-background_color_secondary p-2 h-12 w-12">
                        <Icons.rocket />
                      </span>
                    </div>
                    <div className="flex flex-col justify-start items-stretch">
                    <h4 className="mb-1 font-medium text-sm">Prompts to get you started</h4>
                <span className="text-xs leading-relaxed text-content_color_secondary">
                Get up to speed with testing REST APIs on Postman.                </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 h-48">
                <div className="border border-border_color_default rounded-md p-1 min-w-56 cursor-pointer ">
                  <div className="p-5 flex flex-col min-w-[auto] justify-start items-stretch flex-auto">
                    <div className="flex pb-2 justify-start items-stretch">
                      <span className="flex justify-center items-center rounded-md bg-background_color_secondary p-2 h-12 w-12">
                        <Icons.rocket />
                      </span>
                    </div>
                    <div className="flex flex-col justify-start items-stretch">
                    <h4 className="mb-1 font-medium text-sm">Keyboard shortcuts</h4>
                <span className="text-xs leading-relaxed text-content_color_secondary">
                Get up to speed with testing REST APIs on Postman.                </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 h-48">
                <div className="border border-border_color_default rounded-md p-1 min-w-56 cursor-pointer ">
                  <div className="p-5 flex flex-col min-w-[auto] justify-start items-stretch flex-auto">
                    <div className="flex pb-2 justify-start items-stretch">
                      <span className="flex justify-center items-center rounded-md bg-background_color_secondary p-2 h-12 w-12">
                        <Icons.rocket />
                      </span>
                    </div>
                    <div className="flex flex-col justify-start items-stretch">
                    <h4 className="mb-1 font-medium text-sm">Write up your notes</h4>
                <span className="text-xs leading-relaxed text-content_color_secondary">
                Get up to speed with testing REST APIs on Postman.                </span>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>

          </div>
        </div>
      </div>

    </>
  );
}
