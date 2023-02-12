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
            <div className="mb-10 w-[90%] bg-gray-900 py-2 max-w-[500px] mx-auto flex items-center justify-center group">

                {
                    [3, 4, 5, 6].reverse().map((s, ind) => {
                        return <span className={`block group-hover:bg-white transition-colors duration-200 ease-out h-${s} w-${s} bg-[#ff8a75] rounded-full mx-2`} key={ind}></span>
                    })
                }

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 px-10 gap-10 gap-y-16 pb-24">

                {posts.map((post: Post) => {
                    return <Blog post={post} key={post._id} route={`/post/${post.slug}`} />
                })}
            </div>
        </section>
    )
}

export default BlogList;