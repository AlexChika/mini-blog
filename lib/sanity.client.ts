import createClient from "@sanity/client";
import { groq } from "next-sanity";
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION!;
const token = process.env.NEXT_PUBLIC_SANITY_API_TOKEN!;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});
