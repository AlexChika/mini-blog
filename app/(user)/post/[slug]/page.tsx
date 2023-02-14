import { groq } from 'next-sanity'
import Image from 'next/image'
import React from 'react'
import { PortableText } from '@portabletext/react'
import { client } from '../../../../lib/sanity.client'
import urlFor from '../../../../lib/urlFor'
import PostBanner from '../../../../components/PostBanner'
import { RichTextComponents } from '../../../../components/RichTextComponent'
import Blog from '../../../../components/Blog'
import Comments from '../../../../components/PostComments'

type Props = {
    params: {
        slug: string
    }
}

export const revalidate = 60

export async function generateStaticParams() {
    const query = groq`*[_type == "post"]{
        slug
    }`

    const slugs: { slug: Slug }[] = await client.fetch(query);
    return slugs.map((slug) => {

        return {
            slug: slug.slug.current
        }
    })
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

            <div className='flex flex-col min-[800px]:flex-row justify-between gap-10 w-full px-2 sm:px-5'>

                <article className='mt-7 pt-5 pl-3 sm:pl-5 min-w-[384px] min-[800px]:w-[60%] bg-white'>
                    <PortableText value={post.body} components={RichTextComponents} />
                </article>

                <section className='min-[800px]:max-w-[500px] min-[800px]:w-[40%] mt-7 pr-3 sm:pr-5'>
                    <Comments params={{ slug, id: post._id, body: post.title }} />

                    {
                        posts.map((post) => {
                            return <div className='mb-10' key={post._id}>
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