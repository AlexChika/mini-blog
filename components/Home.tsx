import BlogCard from "./BlogCard";

type Props = {
  posts: Post[];
};

const BlogList = ({ posts }: Props) => {
  return (
    <section>
      <div className="mb-10 w-full bg-transparent py-2 mx-auto flex items-center justify-center group relative">
        {[17, 14, 10, 6, 10, 14, 17].map((s, i) => {
          return (
            <span
              style={{ width: `${s}px`, height: `${s}px` }}
              className={`block group-hover:bg-[#ff8a75] transition-colors duration-200 ease-out bg-gradient-to-r from-[#ff8a75] to-black rounded-full mx-2`}
              key={i}
            />
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 px-3 min-[31.25rem]:px-5 sm:px-10 gap-10 gap-y-16 pb-24">
        {posts.map((post: Post) => {
          return (
            <BlogCard
              post={post}
              key={post._id}
              route={`/post/${post.slug.current}`}
            />
          );
        })}
      </div>
    </section>
  );
};

export default BlogList;
