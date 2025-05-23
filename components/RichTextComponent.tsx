import Image from "next/image";
import Link from "next/link";
import urlFor from "lib/urlFor";

export const RichTextComponents = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="relative w-full aspect-video max-h-96 m-3 mx-auto">
          <Image
            className="object-contain"
            src={urlFor(value).url()}
            alt="Blog Post Image"
            fill
          />
        </div>
      );
    },
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="ml-10 py-5 list-disc space-y-5">{children}</ul>
    ),

    number: ({ children }: any) => (
      <ol className="mt-lg list-decimal">{children}</ol>
    ),
  },

  inline: {
    span: ({ children }: any) => (
      <span className="text-4xl pb-7 font-bold">{children}</span>
    ),
  },

  block: {
    h1: ({ children }: any) => (
      <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl pt-7 font-bold">
        {children}
      </h1>
    ),

    h2: ({ children }: any) => (
      <h2 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl pt-4 font-bold">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-3xl pt-3 font-bold">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-2xl pt-3 font-bold">{children}</h4>
    ),

    blockquote: ({ children }: any) => (
      <blockquote className="border-l-[#ff8a75] bg-[#ff8a75] bg-opacity-10 border-l-4 pl-5 py-5 my-5 max-w-[600px]">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => <p className="pt-2"> {children}</p>,
  },

  marks: {
    link: ({ children, value }: any) => {
      const target = (value?.href || "").startsWith("http")
        ? "_blank"
        : undefined;

      return (
        <Link
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noindex nofollow" : undefined}
          className="underline decoration-[#ff8a75] hover:decoration-black"
        >
          {children}
        </Link>
      );
    },
    em: ({ children }: any) => (
      <em className="font-semibold italic">{children}</em>
    ),
  },
};
