import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION!;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});
