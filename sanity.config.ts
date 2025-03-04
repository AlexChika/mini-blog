import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { myTheme } from "./theme";
import StudioNavbar from "./components/StudioNavbar";
import StudioLogo from "./components/StudioLogo";
import { getDefaultDocumentNode } from "./lib/defaultDocumentNode";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_DATASET!;

export default defineConfig({
  basePath: "/studio",
  name: "Blog_Studio",
  title: "Mini Blog",

  projectId,
  dataset,

  plugins: [
    // deskTool({ defaultDocumentNode: getDefaultDocumentNode }),
    structureTool({ defaultDocumentNode: getDefaultDocumentNode }),
    visionTool(),
  ],

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
