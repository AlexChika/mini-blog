import React, { Suspense } from "react";
import PreviewProvider from "./PreviewProvider";
import PreviewHome from "./PreviewHome";

type Props = {
  posts: Post[];
  query: string;
};

function HomePreview({ posts, query }: Props) {
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
      <PreviewProvider>
        <PreviewHome query={query} initialPost={posts} />;
      </PreviewProvider>
    </Suspense>
  );
}

export default HomePreview;
