import { defineField, defineType } from "sanity";

export default defineType({
  name: "comment",
  title: "Comment",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "commentors name here",
    }),

    defineField({
      name: "text",
      title: "Comment Text",
      type: "string",
      description: "Comments text content",
    }),

    defineField({
      name: "subcomments",
      title: "Sub Comment",
      type: "array",
      of: [{ type: "reference", to: { type: "subcomment" } }],
    }),

    defineField({
      name: "publishedAt",
      title: "Date of publication",
      type: "datetime",
    }),
  ],
});
