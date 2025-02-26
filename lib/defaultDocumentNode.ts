import type { DefaultDocumentNodeResolver } from "sanity/structure";
import { Iframe } from "sanity-plugin-iframe-pane";

const url =
  process.env.NODE_ENV === "production"
    ? "https://miniblog.globalstack.dev/api/preview"
    : "http://localhost:3000/api/preview";

// Import this into the deskTool() plugin
export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (
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
            url: url,
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
