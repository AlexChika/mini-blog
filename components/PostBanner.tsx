// "use client"
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
// import {useState,useEffect} from 'react'
import urlFor from '../lib/urlFor'
import { RichTextComponents } from './RichTextComponent'

const PostBanner = ({ post }: { post: Post }) => {

    return (
        <section className='space-y-2 border border-[#ff8a75] text-white'>

            {  /* ------------- post banner ------------- */}
            <div className='relative min-h-56 flex flex-col md:flex-row justify-between'>

                { /* ------- banner image underneath ------- */}
                <div className='absolute top-0 w-full h-full opacity-10 blur-sm p-10'>
                    <Image className='object-cover mx-auto object-center' src={urlFor(post.mainImage).url()} alt={post.author.name} fill />
                </div>

                {/* - banner text overlaying banner image - */}
                <section className='px-5 sm:px-10 py-5 bg-[#ff8a75] w-full'>
                    <div className='flex flex-col md:flex-row justify-between gap-y-5'>
                        <div>
                            <h1 className='text-4xl font-extrabold'>{post.title}</h1>
                            <p>
                                {
                                    new Date(post._createdAt).toLocaleDateString("en-US", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric"
                                    })
                                }
                            </p>
                        </div>

                        <div className='flex items-center space-x-2'>
                            <Image className='rounded-full' src={urlFor(post.author.image).url()} alt={post.author.name} height={40} width={40} />

                            <div className='w-64'>
                                <h3 className='text-lg font-bold'>{post.author.name}</h3>
                                <PortableText value={post.author.bio} components={RichTextComponents} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className='max-w-4xl italic py-10'>{post.description}</h2>
                        <div className='flex items-center justify-end mt-auto space-x-2'>
                            <p className="text-gray-800 bg-white px-3 py-1 rounded-full text-sm font-semibold mt-4">
                                {post.likes}  Likes
                            </p>

                            {
                                post.categories.map((category) => {
                                    return <p key={category._id} className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4">
                                        {
                                            category.title
                                        }
                                    </p>
                                })
                            }
                        </div>
                    </div>
                </section>
            </div>

        </section>
    )
}

export default PostBanner;