type Props = {
    posts: Post[]
}

const BlogList = ({ posts }: Props) => {
    console.log(posts.length);

    return (
        <div>BlogList</div>
    )
}

export default BlogList