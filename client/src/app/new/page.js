import { Icons } from '@/components/icons/icons'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function UserHomePage() {
    return (
        <>

            <nav className='w-full fixed top-0 z-50 bg-white border-b border-border2 h-[3.5rem] flex items-center '>
                <div className='w-full flex items-center justify-between px-2.5 py-3'>
                    <div className='mx-2.5'><h1 className='text-2xl'>notecraft</h1></div>
                    <div className='flex gap-4'>
                        <Button variant='secondary'>Support</Button>
                        <Button variant='secondary'>Feedback</Button>
                        <div className='flex items-center justify-center'>
                            <Icons.settings />
                        </div>
                    </div>
                </div>

            </nav>

            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">



            </aside>

            <main className="p-4 sm:ml-64">
                <div className='mt-14 h-full w-full flex flex-col' >
                    <div className='w-full h-full '>
                        <div className=' w-full mx-auto max-w-2xl mt-16 mb-20 px-2'>
                            <h2 className='text-4xl mb-1.5 font-bold'>Hello, Ayub</h2>

                            <div className='flex flex-col gap-4'>
                                <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
                                    <div class="flex flex-col items-start justify-between p-4 px-4 h-[9.5rem] rounded-xl border cursor-pointer flex-grow flex-basis-0 duration-150 ease-in transition-border border-border3 hover:border-textGray3 hover:scale-[1.015] shadow-feint">
                                        <div className="flex flex-col items-start justify-between p-4 px-4 h-[9.5rem] rounded-xl border cursor-pointer flex-grow flex-basis-0 duration-150 ease-in transition-border border-border3 hover:border-textGray3 hover:scale-[1.015] shadow-feint" ><Icons.note /></div>
                                        
                                        <div>
                                            <span class="block text-md font-semibold mb-0.5">Write</span>
                                            <span class="block text-sm text-textGray">Create a new note</span>
                                        </div>
                                    </div>
                                    <div class="flex flex-col items-start justify-between p-4 px-4 h-[9.5rem] rounded-xl border cursor-pointer flex-grow flex-basis-0 duration-150 ease-in transition-border border-border3 hover:border-textGray3 hover:scale-[1.015] shadow-feint"><svg width="18" height="18" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M36.1036 25.7891V32.6663C36.1036 33.5782 35.7413 34.4528 35.0965 35.0977C34.4516 35.7426 33.577 36.1049 32.665 36.1049H8.59485C7.68287 36.1049 6.80825 35.7426 6.16339 35.0977C5.51853 34.4528 5.15625 33.5782 5.15625 32.6663V25.7891" stroke="#C0C0C0" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M29.2281 13.7527L20.6316 5.15625L12.0352 13.7527" stroke="#C0C0C0" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20.6309 5.15625V25.7878" stroke="#C0C0C0" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                        <div>
                                            <span class="block text-md font-semibold mb-0.5">Import</span>
                                            <span class="block text-sm text-textGray">Add files into your library</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>


            </main>




        </>
    )
}
