type Base = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

interface Post extends Base {
  author: Author;
  body: Block[];
  categories: Category[];
  mainImage: Image;
  slug: SLug;
  title: string;
  description: string;
  likes: number;
  comments: Comment[];
}

interface Author extends Base {
  bio: Block[];
  image: Image;
  name: string;
  slug: Slug;
}
interface SubComment extends Base {
  name: string;
  text: string;
  publishedAt: string;
}

interface Comment extends Base {
  name: string;
  text: string;
  subcomments: SubComment[];
  publishedAt: string;
}

interface Category extends Base {
  description: string;
  title: string;
}

interface Image {
  _type: "image";
  asset: Reference;
}
interface Reference {
  _ref: string;
  _type: "reference";
}
interface Slug {
  _type: "slug";
  current: string;
}
interface Block {
  _key: string;
  _type: "block";
  children: Span[];
  markDefs: any[];
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
}

interface Span {
  _key: string;
  _type: "span";
  marks: string[];
  text: string;
}

interface MainImage {
  _type: "image";
  assest: Reference;
}

interface Title {
  _type: "string";
  current: string;
}
