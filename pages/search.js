import Layout from "components/layout/layout";
import PostList from "components/postList";
import { getAllPosts } from "./api/post/all";

export default function Search({ posts }) {
    return (
    <Layout title="Dev Gallery | Search"> 
        <h3>Results:</h3>

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