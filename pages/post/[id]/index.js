import Layout from "pages/components/layout";
import PostComponent from "./componentTypes/postComponent";
import CommentSection from "../../components/comment/commentSection";
// import { getAllPosts } from "pages/api/post/all";
import { getPost } from "pages/api/post/[post_id]";

import styles from "styles/post.module.css";

export default function Post({ post, comments }) {
    if(!post)
        return <p>There was an issue retrieving this post. :(</p>

    return (
    <Layout title={ post.title }>
        <div className={styles.post}>
            <h1>{ post.title }</h1>
            <p><i>{ post.description }</i></p>
            <h4>
                <a href={ "/user/" + post.author.username }>View other projects by { post.author.username }</a>
            </h4>

            <div id="components" className={styles.components}>
            { post.components.map((component, idx) =>
                <div className={styles.componentWrapper} key={ idx } >
                    <PostComponent 
                        key={ idx }
                        component={ component }/>
                </div>
            ) }
            </div>
        </div>
        <CommentSection comments={comments} post_id={post._id} />
    </Layout>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    const post = await getPost(id);

    const res2 = await fetch(process.env.BASE_URL + "/api/comments/" + id);
    const comments = await res2.json();

    return {
        props: {
            post,
            comments,
        },
        // revalidate: 10,
    }
}

// export async function getStaticPaths() {
//     const posts = await getAllPosts();

//     const paths = posts.map(post => {
//         return { params: { id: post._id } }
//     });

//     return {
//         paths: paths,
//         fallback: false,
//     }
// }