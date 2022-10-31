import Layout from "pages/components/layout";
import PostList from "./components/postList";

export default function Search({ posts }) {
    return (
    <>
        <Layout title="Dev Gallery | Search"> 
            <h3>Search:</h3>
            <input type="text"></input>

            <PostList posts={ posts } />
        </Layout>
    </>
    );
}
  
export async function getStaticProps(context) {
    const res = await fetch(process.env.BASE_URL + "/api/post/all");
    const posts = await res.json();
    
    return {
        props: {
            posts
        },
    }
}