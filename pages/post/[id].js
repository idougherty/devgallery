import Layout from "pages/components/layout";

export default function Post({ post }) {
    if(!post)
        return <p>error :(</p>

    return (
    <>
        <Layout title={ post.title }>
            <h2>{ post.title }</h2>
            <h4>
                <a href={ "/user/" + post.author._id }>View other projects by { post.author.username }</a>
            </h4>
            <p>{ post.content }</p>
        </Layout>
    </>
    );
}

export async function getStaticProps(context) {
    const { id } = context.params;
    
    const res = await fetch(process.env.BASE_URL + "/api/post/" + id);
    const post = await res.json();
    
    return {
        props: {
            post,
        },
    }
}

export async function getStaticPaths() {
    const res = await fetch(process.env.BASE_URL + "/api/post/all");
    const posts = await res.json();
    
    const paths = posts.map(post => {
        return { params: { id: post._id } }
    });

    return {
        paths: paths,
        fallback: false,
    }
}