"use client";

// once rollup supports "use client" module directive then "next-sanity" will include them and this reexport will no longer be necessary

import { LiveQueryProvider } from "next-sanity/preview";
// export { PreviewSuspense as default } from "next-sanity/preview";

import { client } from "../lib/sanity.client";
const _token =
  typeof process === "undefined"
    ? ""
    : process.env.NEXT_PUBLIC_SANITY_API_TOKEN!;

export default function PreviewProvider({
  children,
  token = _token,
}: {
  children: React.ReactNode;
  token?: string;
}) {
  if (!token) throw new TypeError("Missing token");
  const _client = client.withConfig({
    token,
    useCdn: false,
    ignoreBrowserTokenWarning: true,
    perspective: "drafts",
  });

  return (
    <LiveQueryProvider client={_client} token={token}>
      {children}
    </LiveQueryProvider>
  );
}
