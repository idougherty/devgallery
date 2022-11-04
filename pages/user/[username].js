import Layout from "pages/components/layout";
import PostList from "pages/components/postList";

export default function User({ user }) {
    return (
    <>
        <Layout title={ "Dev Gallery | " + user.username }>
            <h2>{ user.username }'s Posts</h2>
            <PostList posts={ user.posts } />
        </Layout>
    </>
    );
}
  
export async function getStaticProps(context) {
    const { username } = context.params;
    
    const res = await fetch(process.env.BASE_URL + "/api/user/" + username);
    const user = await res.json();
    
    return {
        props: {
            user,
        },
    }
}

export async function getStaticPaths() {
    const res = await fetch(process.env.BASE_URL + "/api/user/all");
    const users = await res.json();
    
    const paths = users.map(user => {
        return { params: { username: user.username } }
    });

    return {
        paths: paths,
        fallback: false,
    }
}