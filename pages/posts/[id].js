import Head from "next/head";
import NavBar from "pages/components/navbar";

function Post({ post }) {
    return (
    <>
        <Head>
            <title>{ post.title }</title>
            <meta name="description" content="Share your projects with a community of CS tinkerers."></meta>
        </Head>

        <NavBar></NavBar>
        
        <div>
            <h2>{ post.title }</h2>
            <p>{ post.content }</p>
        </div>
    </>
    );
}

export default Post;
  
export async function getStaticProps(context) {
    const { id } = context.params;
    
    const res = await fetch(process.env.BASE_URL + "/api/posts/" + id);
    const post = await res.json();
    
    return {
        props: {
            post,
        },
    }
}

export async function getStaticPaths() {
    const res = await fetch(process.env.BASE_URL + "/api/posts");
    const posts = await res.json();
    
    const paths = posts.map(post => {
        return { params: { id: post.id } }
    });

    return {
        paths: paths,
        fallback: false,
    }
}