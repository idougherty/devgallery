export default function PostList({ posts }) {
    if(!posts || posts.error)
        return <p>error :(</p>

    return (
        <ul>
        {
            posts.map(post =>
                <li key={ post._id }>
                    <a href={ "/post/" + post._id }>
                        { post.title }
                    </a>
                </li>
            )
        }
        </ul>
    );
}