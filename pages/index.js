import Layout from "pages/components/layout";
import PostList from "pages/components/postList";

export default function Home({ posts }) {
    return (
    <Layout title="Dev Gallery">
        <h3>All Posts:</h3>
        <PostList posts={ posts } />
    </Layout>
    );
}
  
export async function getStaticProps() {
    const res = await fetch(process.env.BASE_URL + "/api/post/all");
    const posts = await res.json();
    
    return {
        props: {
            posts,
        },
    }
}