import { groq } from "next-sanity";
import { draftMode } from "next/headers";
import { client } from "sanityUtils/sanityClient";
import Home from "components/Home";
import HomePreview from "components/homePreview";

export const revalidate = 172800; // 2 days

const query = groq`*[_type == "post"]{
    ...,
    author->,
    categories[]->} | order(_createdAt desc)
`;

const HomePage = async () => {
  const { isEnabled } = await draftMode();
  const posts = await client.fetch(query);

  if (isEnabled) {
    return <HomePreview posts={posts} query={query} />;
  }

  return <Home posts={posts} />;
};

export default HomePage;
