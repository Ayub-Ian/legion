import React from 'react'
import { Icons } from '../icons/icons'
import Link from 'next/link'

export default function UserChatbotItem({ chatbot }) {

    const icon = {
        DOCUMENT: <Icons.file  className="w-5 h-5" />,
        NOTE: <Icons.word />
    }

    const { id, name, c_type: type } = chatbot


    return (
        <>

            <li className="group flex flex-row items-center gap-2 justify-left cursor-pointer rounded-e-lg px-2.5 me-2 py-2 relative overflow-hidden h-10 hover:bg-gray-200 bg-white text-textGray">
                <Link  href={`/f/${id}`} className="flex flex-row gap-2 ms-2.5 items-center overflow-hidden flex-none w-full">
                    <div className="flex items-center justify-center">
                        {icon[type]}



                    </div>
                    <div className="flex flex-row">
                        <h2 className="text-sm font-medium text-left whitespace-nowrap overflow-hidden">{name}</h2>
                    </div>

                    <div className="w-12 h-full bg-gradient-to-l rounded-r-lg absolute right-0 group-hover:from-gray-200 from-white group-hover:right-0"></div>
                    <div className='hidden group-hover:inline-flex'> 
                    <Icons.more />
                    </div>
                    
                </Link>

            </li>
        </>
    )
}
