import { groq } from 'next-sanity'
import { PortableText } from '@portabletext/react'
import { client } from '../../../../lib/sanity.client'
import PostBanner from '../../../../components/PostBanner'
import { RichTextComponents } from '../../../../components/RichTextComponent'
import Blog from '../../../../components/Blog'
import CommentComponent from '../../../../components/PostComments'
import PostShare from '../../../../components/PostShare'

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
            categories[]->,
            comments[]->{
                ...,
             subcomments[]->
            }
        }
    `

    const query = groq`
        *[_type == "post"]{
          ...,
          author->,
          categories[]->
       }[0...6] | order(_createdAt desc)
    `

    const post: Post = await client.fetch(q, { slug });
    const posts: Post[] = await client.fetch(query);


    return (
        <main className='pb-28'>
            <PostBanner post={post} />

            <div className='flex flex-col min-[800px]:flex-row justify-between gap-10 w-full px-2 sm:px-5'>

                <article className='mt-7 pt-5 min-[800px]:pl-5  min-[800px]:w-[60%] w-full bg-white'>
                    <PortableText value={post.body} components={RichTextComponents} />
                </article>

                <section className='min-[800px]:max-w-[500px] min-[800px]:w-[40%] mt-7 min-[800px]:pr-5'>

                    <PostShare params={{ body: post.title, slug }} />

                    <CommentComponent params={{ id: post._id, comments: post.comments, likes: post.likes }} />

                    {/* Recent Posts */}
                    <h2 className='text-2xl font-bold text-center bg-[#ff8a75]  bg-opacity-20 p-5 mb-9'>Recent Posts</h2>

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