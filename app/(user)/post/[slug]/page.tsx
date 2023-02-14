import { groq } from 'next-sanity'
import Image from 'next/image'
import React from 'react'
import { PortableText } from '@portabletext/react'
import { client } from '../../../../lib/sanity.client'
import urlFor from '../../../../lib/urlFor'
import PostBanner from '../../../../components/PostBanner'
import { RichTextComponents } from '../../../../components/RichTextComponent'
import Blog from '../../../../components/Blog'

type Props = {
    params: {
        slug: string
    }
}

async function Post({ params: { slug } }: Props) {
    const q = groq`
        *[_type == "post" && slug.current == $slug][0]{
            ...,
            author->,
            categories[]->
        }
    `

    const query = groq`
        *[_type == "post"]{
          ...,
          author->,
          categories[]->
       }[0...6]
    `

    const post: Post = await client.fetch(q, { slug });
    const posts: Post[] = await client.fetch(query)

    return (
        <main className='pb-28'>
            <PostBanner post={post} />

            <div className='flex justify-between gap-5 w-full'>
                <article className='px-5 sm:px-10 min-w-[384px]'>
                    <PortableText value={post.body} components={RichTextComponents} />
                </article>

                <section className='max-w-[500px]'>
                    {
                        posts.map((post) => {
                            return <div className='mb-7' key={post._id}>
                                <Blog route={`/post/${post.slug.current}`} post={post} />
                            </div>
                        })
                    }
                </section>
            </div>
        </main>
    )
}

export default Post