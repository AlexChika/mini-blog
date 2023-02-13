import Blog from "./Blog";

type Props = {
    posts: Post[]
}

const BlogList = ({ posts }: Props) => {
    return (
        <section >
            <div className="mb-10 w-[90%] bg-transparent py-2 max-w-[500px] mx-auto flex items-center justify-center group relative">

                {
                    [5, 7, 9, 11, 13, 15, 17].map((s, ind) => {
                        return <span style={{ width: `${s}px`, height: `${s}px`, }} className={`block group-hover:bg-[#ff8a75] transition-colors duration-200 ease-out bg-gray-900 rounded-full mx-2`} key={ind}></span>
                    })
                }

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 px-3 min-[500px]:px-5 sm:px-10 gap-10 gap-y-16 pb-24">

                {posts.map((post: Post) => {
                    return <Blog post={post} key={post._id} route={`/post/${post.slug.current}`} />
                })}
            </div>
        </section>
    )
}

export default BlogList;


// ./src/defaultDocumentNode.ts

// import { DefaultDocumentNodeResolver } from 'sanity/desk'
// import Iframe from 'sanity-plugin-iframe-pane'
// import { SanityDocument } from 'sanity'

// // Customise this function to show the correct URL based on the current document
// function getPreviewUrl(doc: SanityDocument) {
//     return doc?.slug?.current
//         ? `${window.location.host}/${doc.slug.current}`
//         : `${window.location.host}`
// }

// // Import this into the deskTool() plugin
// export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
//     // Only show preview pane on `movie` schema type documents
//     switch (schemaType) {
//         case `movie`:
//             return S.document().views([
//                 S.view.form(),
//                 S.view
//                     .component(Iframe)
//                     .options({
//                         url: (doc: SanityDocument) => getPreviewUrl(doc),
//                     })
//                     .title('Preview'),
//             ])
//         default:
//             return S.document().views([S.view.form()])
//     }
// }