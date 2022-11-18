import Layout from "components/layout/layout";
import PostList from "components/postList";
import { getAllPosts } from "./api/post/all";

export default function Home({ posts }) {
    return (
    <Layout title="Dev Gallery">
        <h3>All Posts:</h3>
        <PostList posts={ posts } />
    </Layout>
    );
}
  
export async function getStaticProps() {
    const posts = await getAllPosts();
    
    return {
        props: {
            posts,
        },
    }
}