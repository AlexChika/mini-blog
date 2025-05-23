"use strict";

import { HiArrowUpRight } from "react-icons/hi2";
import Image from "next/image";
import Link from "next/link";
import urlFor from "../lib/urlFor";

const BlogCard = ({ route, post }: { route: string; post: Post }) => {
  return (
    <Link href={route}>
      <article className="group cursor-pointer flex flex-col bg-gray-200 group">
        <div className="relative w-full h-80 group-hover:scale-105 transition-transform duration-200 ease-out">
          <Image
            className="object-cover object-center"
            src={urlFor(post.mainImage).url()}
            alt={post.author.name}
            fill
          />

          {/* overlay on photo */}
          <div className="absolute bottom-0 w-full bg-opacity-40 bg-black drop-shadow-lg rounded text-white p-3 justify-between flex">
            {/* text - wrappers */}
            <div className="self-end text-white">
              <p className="font-bold">{post.title}</p>
              <p>
                {new Date(post._createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* categoriess */}
            <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-2 items-center">
              {post.categories.slice(0, 2).map((category, i) => {
                return (
                  <div
                    key={i}
                    className="bg-slate-500 text-center text-white px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    <p>{category.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* post description */}
        <div className="mt-5 flex-1 p-3">
          <p className="underline text-lg font-bold">{post.title}</p>
          <p className="text-gray-500 line-clamp-2">
            {post.description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Tenetur quam laboriosam, quisquam fugit suscipit,
            sequi officia cumque reprehenderit aut ducimus voluptatum quos minus
            in perspiciatis numquam, corrupti laborum. Exercitationem, quidem.
          </p>
        </div>

        <p className="mt-5 p-3 font-bold flex items-center group-hover:underline">
          Read Post
          <HiArrowUpRight className="ml-2 h-4 w-4" />
        </p>
      </article>
    </Link>
  );
};

export default BlogCard;
