import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "pages/components/layout";
import PostList from "pages/components/postList";
import { BiPlusCircle } from "react-icons/bi";
import styles from "styles/user.module.css"

export default function User({ user }) {
    const { data: session } = useSession();
    const router = useRouter();

    const ownsPage = session?.user?.valid 
        && session.user._id == user._id; 

    const createPost = async () => {
        const res = await fetch("/api/post/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                author_id: session.user._id
            }),
        });

        const data = await res.json();

        if(data.ok) {
            router.push(`/post/${data.message}/edit`);
        } else {
            // TODO handle failure
        }
    }

    return (
    <Layout title={ "Dev Gallery | " + user.username }>
        <h2>{ user.username }'s Posts
            { ownsPage && 
                <button className={styles.createPost} onClick={ createPost }><BiPlusCircle /></button>
            }
        </h2>
        <PostList posts={ user.posts } />
    </Layout>
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