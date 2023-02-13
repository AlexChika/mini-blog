import type { DefaultDocumentNodeResolver } from "sanity/desk";
import Iframe from "sanity-plugin-iframe-pane";

const url =
  process.env.NODE_ENV === "production"
    ? "https://dev-arise-blog.vercel.app/api/preview"
    : "http://localhost:3000/api/preview";

// Import this into the deskTool() plugin
export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  // Only show preview pane on `movie` schema type documents
  switch (schemaType) {
    case `post`:
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: `${
              process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost::3000"
            }/api/preview`,
            defaultSize: `desktop`, // default `desktop`
            reload: {
              button: true, // default `undefined`
            },
            attributes: {},
          })
          .title("Preview"),
      ]);
    default:
      return S.document().views([S.view.form()]);
  }
};
