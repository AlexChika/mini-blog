import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { myTheme } from "./theme";
import StudioNavbar from "./components/StudioNavbar";
import StudioLogo from "./components/StudioLogo";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_DATASET!;

export default defineConfig({
  basePath: "/studio",
  name: "Blog_Studio",
  title: "sanity blog",

  projectId,
  dataset,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      logo: StudioLogo,
      navbar: StudioNavbar,
    },
  },

  theme: myTheme,
});
