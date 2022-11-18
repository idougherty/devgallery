import Layout from "pages/components/layout";
import { useEffect, useState } from "react";
import { BiCheck, BiSync, BiError, BiLoaderAlt } from "react-icons/bi";
import ComponentList from "./componentList";
import styles from "styles/post.module.css";

export default function EditPost({ postData }) {
    if(!postData)
        return ( <Layout> <p>There was an issue retrieving this post. :(</p> </Layout> )

    const [post, setPost] = useState({ ...postData });
    const [syncStatus, setSyncStatus] = useState("synced");

    useEffect(() => {
        console.log(syncStatus);

        if(syncStatus != "synced") {
            window.onbeforeunload = () => true;
        } else {
            window.onbeforeunload = undefined;
        }
    }, [syncStatus]);

    const syncPost = async () => {
        setSyncStatus("syncing");
        
        const res = await fetch(`/api/post/${post._id}/edit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        })
        
        const data = await res.json();

        if(data.ok) {
            setSyncStatus("synced");
        } else {
            setSyncStatus("failed");
        }
    }
    
    const updatePost = () => {
        setSyncStatus("desynced");
        setPost({ ...post });
    }

    const setMetaContent = (e) => {
        const tag = e.target.dataset.tag;
        post[tag] = e.target.innerText;
        updatePost();
    };

    return (
    <Layout title={ post.title }>
        <div className={styles.post}>
            <h1 onBlur={ setMetaContent } data-tag="title" contentEditable="true" suppressContentEditableWarning>
                { post.title }
            </h1>
            <p onBlur={ setMetaContent } data-tag="description" contentEditable="true" suppressContentEditableWarning>
                <i>{ post.description }</i>
            </p>
            <h4>
                <a href={ "/user/" + post.author.username }>View other projects by { post.author.username }</a>
            </h4>
            <ComponentList post={ post } updatePost={ updatePost } />
        </div>
        <button onClick={ syncPost }
                data-state={ syncStatus } 
                className={ styles.submit } >
            { 
            (syncStatus == "synced" && 
            <>All changes synced <BiCheck /></>
            ) || (syncStatus == "desynced" && 
            <>Save changes! <BiSync /></>
            ) || (syncStatus == "syncing" && 
            <><BiLoaderAlt className="spinner" /></>
            ) || (syncStatus == "failed" && 
            <>Sync failed, please try again later. <BiError /></>) }
        </button>
    </Layout>
    );
}

EditPost.requireAuth = true;
EditPost.verifyAuth = (props, user) => {
    const { postData } = props;
    const valid = user._id == postData.author_id;
    const redirectUrl = `/post/${postData._id}`;

    return { valid, redirectUrl };
}

export async function getStaticProps(context) {
    const { id } = context.params;
    
    const res = await fetch(process.env.BASE_URL + "/api/post/" + id);
    const post = await res.json();

    return {
        props: {
            postData: post,
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