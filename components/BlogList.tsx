import { ArrowUpRightIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import urlFor from "../lib/urlFor"
import Blog from "./Blog"

type Props = {
    posts: Post[]
}

const BlogList = ({ posts }: Props) => {
    // border - [#ff8a75]
    return (
        <section >
            <div className="mb-10 w-[90%] bg-gray-900 py-2 max-w-[500px] mx-auto flex items-center justify-center group relative">

                {
                    [5, 7, 9, 11, 13, 15, 17].map((s, ind) => {
                        return <span style={{ width: `${s}px`, height: `${s}px`, }} className={`block group-hover:bg-[#ff8a75] transition-colors duration-200 ease-out bg-white rounded-full mx-2`} key={ind}></span>
                    })
                }

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 px-3 min-[500px]:px-5 sm:px-10 gap-10 gap-y-16 pb-24">

                {posts.map((post: Post) => {
                    return <Blog post={post} key={post._id} route={`/post/${post.slug.current}`} />
                })}
            </div>
        </section>
    )
}

export default BlogList;