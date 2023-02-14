"use client"


import { UserIcon } from '@heroicons/react/24/solid'
import { useEffect, useState, useRef } from 'react'
import getRandomColor from '../lib/randomColors'


type Props = {
    id: string,
}

const Comments = ({ params }: { params: Props }) => {
    const { id } = params

    return (
        <div className='my-12'>
            <h2 className='text-2xl font-bold text-center bg-gray-900 bg-opacity-20 p-5'>Comment</h2>


            {/* comment form */}
            <form className='mt-9'>

                <div className='flex mb-5'>
                    <label className='w-[100px] bg-gray-900 bg-opacity-20 font-medium py-2 px-3' htmlFor="name">Name</label>

                    <input className='flex-1 placeholder:text-center outline-none px-2 border border-gray-100' id='name' placeholder='Enter your name' />
                </div>

                <div className='flex mb-5'>
                    <label className='w-[100px] bg-gray-900 bg-opacity-20 font-medium py-2 px-3 flex items-center' htmlFor="name">Comment</label>

                    <textarea className='flex-1 block h-20 resize-none p-2 placeholder:text-center outline-none px-2 border border-gray-100' id='name' />
                </div>

                <button className='text-white bg-[#ff8a75] py-2 w-full text-center font-bold'>Submit</button>

            </form>


            {/* comment section */}
            <section className='mt-12'>
                <h2 className='text-2xl font-bold text-center bg-gray-900 bg-opacity-20 p-5'>Comment Section</h2>

                {/* spacing */}
                <div aria-hidden className='h-6'></div>



                <div className='max-h-[80vh] overflow-y-auto mb-5'>
                    {[1, 2, 3, 4].map((x, index) => {
                        return <Comment key={x} id={index} />
                    })}
                </div>
            </section>

        </div>

    )
}

function Comment({ id }: { id: number }) {
    let col = getRandomColor()

    useEffect(() => {
        try {
            const wrapper: any = document.querySelector(`[data-id="${id}"]`);
            wrapper.style.setProperty("--bg-color", col)

        } catch (error) {
            console.log(error);
        }
    }, [])

    return <div className='px-3 bg-white'>
        <div data-id={id} className='flex relative'>
            <div className='rounded-full h-8 flex bg-[var(--bg-color)] items-center justify-center min-w-[2rem] z-10'>
                <UserIcon className='h-6 w-6 text-white' />
            </div>

            <div className={`before:content-[''] before:absolute before:w-[2px] before:left-[1rem] before:h-full before:top-0 before:bg-[var(--bg-color)]`}>
                <p className='font-bold text-lg ml-3 truncate italic'>{"Name here"}</p>

                <p className='ml-3 text-gray-500 line-clamp-2'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quam?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quam?
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, quam?
                </p>

                {/* comment buttons */}
                <div className='flex space-x-2 justify-center pb-5'>
                    <button className='font-bold text-neutral-400 cursor-pointer'>Reply</button>
                    <button className='font-bold text-neutral-400 cursor-pointer'>Replies</button>
                    <button className='font-bold text-neutral-400 cursor-pointer'>See all</button>
                </div>
            </div>

        </div>
    </div>
}

export default Comments