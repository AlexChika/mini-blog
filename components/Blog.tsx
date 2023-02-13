"use strict";

import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import urlFor from "../lib/urlFor";


const Blog = ({ route, post }: { route: string, post: Post }) => {
    return (
        <Link href={route}>
            <article className="group cursor-pointer flex flex-col bg-white group drop-shadow-md">
                <div className="relative w-full h-80 drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out">

                    <Image className="object-cover object-center" src={urlFor(post.mainImage).url()} alt={post.author.name} fill />


                    {/* overlay on photo */}
                    <div className="absolute bottom-0 w-full bg-opacity-40 bg-black drop-shadow-lg rounded text-white p-3 justify-between flex">
                        {/* text - wrappers */}
                        <div className="self-end">
                            <p className="font-bold">{post.title}</p>
                            <p>{new Date(post._createdAt).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                            })}</p>
                        </div>

                        {/* categoriess */}
                        <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-2 items-center">
                            {
                                post.categories.slice(0, 2).map((category, i) => {
                                    return <div key={i} className="bg-[#ff8a75] text-center text-black px-3 py-1 rounded-full text-sm font-semibold">
                                        <p>{category.title}</p>
                                    </div>
                                })
                            }
                        </div >
                    </div>
                </div>

                {/* post description */}
                <div className="mt-5 flex-1 p-3">
                    <p className="underline text-lg font-bold">{post.title}</p>
                    <p className="text-gray-500 line-clamp-2">{post.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quam laboriosam, quisquam fugit suscipit, sequi officia cumque reprehenderit aut ducimus voluptatum quos minus in perspiciatis numquam, corrupti laborum. Exercitationem, quidem.</p>
                </div>

                <p className="mt-5 p-3 font-bold flex items-center group-hover:underline">Read Post
                    <ArrowUpRightIcon className="ml-2 h-4 w-4" />
                </p>
            </article>

        </Link>
    )
}

export default Blog