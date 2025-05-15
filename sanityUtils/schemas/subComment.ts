import { defineField, defineType } from "sanity";

export default defineType({
    name: "subcomment",
    title: "Sub Comment",
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
            title: "Sub Comment Text",
            type: "string",
            description: "Sub Comments text content",
        }),

        defineField({
            name: "publishedAt",
            title: "Date of publication",
            type: "datetime",
        }),
    ],
});
