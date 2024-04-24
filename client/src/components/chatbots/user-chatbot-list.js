import { createClient } from '@/lib/supabase/server'
import React from 'react'
import UserChatbotItem from './user-chatbot-item'

const getChatbotsList = async (supabase) => {
    try {
        let { data: chatbots, error } = await supabase
            .from('chatbots')
            .select('*')

        if (error) throw error

        return chatbots

    } catch (error) {
        console.log("Error occured:", error)
    }
}

export default async function UserChatbotList() {

    const supabase = createClient()
    const chatbots = await getChatbotsList(supabase)


    return (
        <>

            <ul className="flex flex-col ">


                {chatbots?.map((chatbot) => (
                    <UserChatbotItem key={chatbot.id} chatbot={chatbot} />
                ))}



            </ul>

        </>
    )
}
