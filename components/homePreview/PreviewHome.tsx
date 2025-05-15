"use client";

import { useLiveQuery } from "next-sanity/preview";
import Home from "../Home";

type Props = {
  initialPost: Post[];
  query: string;
};

const PreviewHome = ({ initialPost, query }: Props) => {
  const [posts] = useLiveQuery(initialPost, query);
  return <Home posts={posts} />;
};

export default PreviewHome;
