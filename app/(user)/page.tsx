import { groq } from "next-sanity";
import { lazy, Suspense } from "react";
import { draftMode } from "next/headers";
import { client } from "../../lib/sanity.client";
import BlogList from "../../components/BlogList";
import PreviewBlogList from "../../components/PreviewBlogList";
const PreviewProvider = lazy(() => import("../../components/PreviewProvider"));

// import PreviewProvider from "../../components/PreviewSuspense";
// import PreviewSuspense from "../../components/PreviewSuspense";

export const revalidate = 60;

const query = groq`*[_type == "post"]{
    ...,
    author->,
    categories[]->} | order(_createdAt desc)
`;

const HomePage = async () => {
  const { isEnabled } = await draftMode();
  const posts = await client.fetch(query);

  if (isEnabled) {
    const children = <PreviewBlogList posts={posts} />;
    return (
      <Suspense
        fallback={
          <div role="status">
            <p className="text-center text-lg animate-pulse text-primary ">
              Loading Preview Data...
            </p>
          </div>
        }
      >
        <PreviewProvider>{children}</PreviewProvider>
      </Suspense>
    );
  }

  return <BlogList posts={posts} />;
};

export default HomePage;
