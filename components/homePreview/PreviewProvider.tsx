"use client";

import { LiveQueryProvider } from "next-sanity/preview";

import { client } from "sanityUtils/sanityClient";
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
