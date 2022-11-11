import Layout from "pages/components/layout";
import { useState } from "react";
import styles from "styles/post.module.css";
import PostComponent from "./postComponent";

export default function Post({ postData }) {
    if(!postData)
        return <p>There was an issue retrieving this post. :(</p>

    const [post, setPost] = useState(postData);

    const updatePostData = async (newData) => {
        // TODO: update serverside before rerendering client page
        setPost({...newData});
    };

    return (
    <Layout title={ post.title }>
        <div className={styles.post}>
            <h2 contentEditable="true" suppressContentEditableWarning>
                { post.title }
            </h2>
            <h4>
                <a href={ "/user/" + post.author.username }>View other projects by { post.author.username }</a>
            </h4>
            <p>{ post.content }</p>
            <div className={styles.components}>
            {
            post.components.map((component, idx) =>
                <PostComponent 
                    editingData={{
                            post: post, 
                            componentIdx: idx, 
                            updatePostData: updatePostData 
                        }}
                    component={ component }
                    key={ idx } />
            )
            }
            </div>
        </div>
        <button className={ styles.submit }>Save Changes</button>
    </Layout>
    );
}

export async function getStaticProps(context) {
    const { id } = context.params;
    
    const res = await fetch(process.env.BASE_URL + "/api/post/" + id);
    const postData = await res.json();

    return {
        props: {
            postData,
        },
    }
}

export async function getStaticPaths() {
    const res = await fetch(process.env.BASE_URL + "/api/post/all");
    const posts = await res.json();
    
    const paths = posts.map(post => {
        return { params: { id: post._id } }
    });

    return {
        paths: paths,
        fallback: false,
    }
}