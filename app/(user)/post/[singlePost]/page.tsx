import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { client } from "sanityUtils/sanityClient";
import PostBanner from "components/singlePost/PostBanner";
import { RichTextComponents } from "components/RichTextComponent";
import BlogCard from "components/BlogCard";
import CommentComponent from "components/singlePost/PostComments";
import PostShare from "components/singlePost/PostShare";

type Props = {
  params: Promise<{
    singlePost: string;
  }>;
};

export const revalidate = 172800; // 2 days

export async function generateStaticParams() {
  const query = groq`*[_type == "post"]{
        slug
    }`;

  const slugs: { slug: Slug }[] = await client.fetch(query);
  return slugs.map((slug) => {
    return {
      singlePost: slug.slug.current,
    };
  });
}

async function Post({ params }: Props) {
  const { singlePost: slug } = await params;
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
    `;

  const query = groq`
        *[_type == "post"]{
          ...,
          author->,
          categories[]->
       }[0...6] | order(_createdAt desc)
    `;

  const post: Post = await client.fetch(q, { slug });
  const posts: Post[] = await client.fetch(query);

  return (
    <main className="pb-28">
      <PostBanner post={post} />

      <div className="flex flex-col min-[50rem]:flex-row justify-between gap-10 w-full px-2 sm:px-5">
        <article className="mt-7 pt-5 min-[50rem]:pl-5  min-[50rem]:w-[60%] w-full bg-white">
          <PortableText value={post.body} components={RichTextComponents} />
        </article>

        <section className="min-[50rem]:max-w-[31.25rem] min-[50rem]:w-[40%] mt-7 min-[50rem]:pr-5">
          <PostShare params={{ body: post.title, slug }} />

          <CommentComponent
            params={{
              id: post._id,
              comments: post.comments,
              likes: post.likes,
            }}
          />

          {/* Recent Posts */}
          <h2 className="text-2xl font-bold text-center bg-gray-200 mb-9 p-5">
            <span className="bg-gradient-to-r from-blue-950 via-[#ff8a75] to-blue-950 bg-clip-text text-transparent">
              Recent Posts
            </span>
          </h2>

          {posts.map((post) => {
            return (
              <div className="mb-10" key={post._id}>
                <BlogCard route={`/post/${post.slug.current}`} post={post} />
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}

export default Post;
