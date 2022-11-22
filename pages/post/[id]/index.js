import Layout from "components/layout/layout";
import PostComponent from "components/postEditing/componentTypes/postComponent";
import CommentSection from "components/commentSection";
// import { getAllPosts } from "pages/api/post/all";
import { getPost } from "pages/api/post/[post_id]";

import styles from "styles/post.module.css";
import { getComments } from "pages/api/comments/[post_id]";

export default function Post({ post, commentData }) {
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
        <CommentSection commentData={commentData} post_id={post._id} />
    </Layout>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params;
    const post = await getPost(id);

    const commentData = await getComments(id);

    return {
        props: {
            post,
            commentData,
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