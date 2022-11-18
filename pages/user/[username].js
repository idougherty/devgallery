import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getAllUsers } from "pages/api/user/all";
import { getUser } from "pages/api/user/[username]";
import Layout from "components/layout/layout";
import PostList from "components/postList";
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
        <h2>{ user.username }&apos;s Posts
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
    
    const user = await getUser(username);

    return {
        props: {
            user,
        },
    }
}

export async function getStaticPaths() {
    const users = await getAllUsers();
    
    const paths = users.map(user => {
        return { params: { username: user.username } }
    });

    return {
        paths: paths,
        fallback: false,
    }
}