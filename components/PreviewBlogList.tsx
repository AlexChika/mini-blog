"use client";

import BlogList from "./BlogList";

type Props = {
  posts: Post[];
};

const PreviewBlogList = ({ posts }: Props) => {
  return <BlogList posts={posts} />;
};

export default PreviewBlogList;
