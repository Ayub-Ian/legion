import UserDocChat from '@/components/chat'
import PDFViewer from '@/components/pdf-viewer'
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

          <div className='flex-1'>
            <UserDocChat />
          </div>
        </div>



      </div>
    </>
  )
}
