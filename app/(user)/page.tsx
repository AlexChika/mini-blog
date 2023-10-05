import { draftMode } from "next/headers";
import { groq } from "next-sanity";
import { client } from "../../lib/sanity.client";
import PreviewSuspense from "../../components/PreviewSuspense";
import BlogList from "../../components/BlogList";
import PreviewBlogList from "../../components/PreviewBlogList";

export const revalidate = 60;

const query = groq`*[_type == "post"]{
    ...,
    author->,
    categories[]->} | order(_createdAt desc)
`;

const HomePage = async () => {
  //   const { isEnabled } = draftMode();
  //   if (isEnabled) {
  //     return (
  //       <PreviewSuspense
  //         fallback={
  //           <div role="status">
  //             <p className="text-center text-lg animate-pulse text-primary ">
  //               Loading Preview Data...
  //             </p>
  //           </div>
  //         }
  //       >
  //         <PreviewBlogList query={query} />
  //       </PreviewSuspense>
  //     );
  //   }

  const posts = await client.fetch(query);

  return <BlogList posts={posts} />;
};

export default HomePage;
