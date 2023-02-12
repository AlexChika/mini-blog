type Props = {
    posts: Post[]
}

const BlogList = ({ posts }: Props) => {
    console.log(posts.length);

    return (
        <div>{posts.length}</div>
    )
}

export default BlogList