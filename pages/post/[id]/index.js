import Layout from "pages/components/layout";
import PostComponent from "./componentTypes/postComponent";
import styles from "styles/post.module.css";

export default function Post({ post }) {
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
    </Layout>
    );
}

export async function getStaticProps(context) {
    const { id } = context.params;
    
    const res = await fetch(process.env.BASE_URL + "/api/post/" + id);
    const post = await res.json();

    return {
        props: {
            post,
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