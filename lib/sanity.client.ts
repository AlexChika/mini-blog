import createClient from "@sanity/client";
import { groq } from "next-sanity";
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION!;
const token = process.env.SANITY_API_TOKEN!;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token:
    "skX3ZG5dBVX7OH0HUomozfztVHtSrpengkuklDzMc0h3dQ7vViGJlGpN0BA46zbHHe82mZP5co6AUwFqGHwZFEGQ4aifEaW1qT78UvbeCAqVeFqiEEHVZPXViR3QQJyfHsSEWwZSK3rNCl9UVriJIwhBGLmB6LR3YgaUdVbsZeeWAY2FeA0y",
});
