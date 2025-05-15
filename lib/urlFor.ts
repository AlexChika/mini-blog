import { client } from "../sanityUtils/sanityClient";
import ImageUrlBuilder from "@sanity/image-url";

const builder = ImageUrlBuilder(client);

function urlFor(url: any) {
  return builder.image(url);
}

export default urlFor;
