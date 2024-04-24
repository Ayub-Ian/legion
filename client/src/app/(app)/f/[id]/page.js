import PDFViewer from '@/components/pdf-viewer'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/server'
import React from 'react'

const getChatbotItem = async (supabase, id) => {
  try {
    let { data: chatbot, error } = await supabase
      .from('chatbots')
      .select("*")
      .eq('id', id)

    if (error) throw error

    return chatbot[0]
  } catch (error) {
    console.log("Something bad happened:", error)
  }
}

export default async function ChatbotPage({ params }) {

  const supabase = createClient()

  const chatbot = await getChatbotItem(supabase, params.id)

  const fileUrl = `${process.env.SUPABASE_STORAGE_URL}/${chatbot.document_url}`



  return (
    <>
      <div className='flex flex-col h-full transition-all duration-200 ease-in-out w-full'>
        <div className="relative flex flex-row gap-4 h-[calc(100dvh-80px)] transition-all duration-200 ease-in-out w-full">
          <div className='flex-1' >

            <PDFViewer fileUrl={fileUrl} />
          </div>

          <div className='flex-1 w-full relative'>
            <div className='flex flex-col w-full gap-5'>
              <div className='flex flex-col gap-1'>
                <h2 className='text-xs font-medium uppercase'>Ayub</h2>
                <div className='border border-border2 p-4 rounded-lg shadow'>
                  <p>Find me a crucial argument from a historically similar case that is applicable to the case I'm working on.</p>
                </div>
              </div>

              <div className='flex flex-col gap-1'>
                <h2 className='text-xs font-medium uppercase'>Notecraft</h2>

                <div className='border border-border2 p-4 rounded-lg shadow'>
                  <p>

                    No, Next.js does not use React Strict Mode in production by default. React Strict Mode is primarily a development tool designed to help identify potential issues and encourage best practices during development. Enabling Strict Mode can impact performance in development environments, but it doesn't affect the production build of your application.

                    <br />
                    <br />
                    In production, Next.js optimizes your application for performance and efficiency without applying Strict Mode. This ensures that your production build runs as efficiently as possible without any additional overhead from Strict Mode checks.
                    <br />
                    <br />
                    If you want to enable Strict Mode in your Next.js application for development purposes, you can wrap your App component with React.StrictModein your _app.js file as shown in the previous response. However, remember to remove it before deploying your application to production to avoid any unnecessary performance impact.
                  </p>
                </div>
              </div>
            </div>


            <div className='absolute bottom-0 mb-5'>

              <div>
                <Input placeholder="Ask your question ..." />
              </div>

            </div>
          </div>
        </div>



      </div>
    </>
  )
}
