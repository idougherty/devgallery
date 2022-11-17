import Layout from "pages/components/layout";
import PostList from "pages/components/postList";

export default function Search({ posts }) {
    return (
    <Layout title="Dev Gallery | Search"> 
        <h3>Results:</h3>

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