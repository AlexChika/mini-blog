"use client";

import { useLiveQuery } from "next-sanity/preview";
import BlogList from "./BlogList";

type Props = {
  posts: Post[];
  query: string;
};

const PreviewBlogList = ({ posts: initialPost, query }: Props) => {
  const [posts] = useLiveQuery(initialPost, query);
  return <BlogList posts={posts} />;
};

export default PreviewBlogList;
