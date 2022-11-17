import { useState } from "react";
import PostComponent from "./componentTypes/postComponent";
import PostControls from "./postControls";
import styles from "styles/post.module.css";
import ComponentMenu from "./componentMenu";

export default function ComponentList({ post, updatePost }) {
    const [componentModal, setComponentModal] = useState(null);

    const setComponentContent = (idx, content) => {
        post.components[idx].content = content;
        updatePost();
    };

    const handleMoveUp = (idx) => {
        if(idx == 0)
            return;

        const tmp = post.components[idx];
        post.components[idx] = post.components[idx - 1]
        post.components[idx - 1] = tmp;

        updatePost();
    };

    const handleMoveDown = (idx) => {
        if(idx == post.components.length - 1)
            return;

        const tmp = post.components[idx];
        post.components[idx] = post.components[idx + 1]
        post.components[idx + 1] = tmp;

        updatePost();
    };

    const handleCreate = (idx, newComponent) => {
        post.components.splice(idx + 1, 0, newComponent);
        setComponentModal(null);
        updatePost();
    };

    const handleDelete = (idx) => {
        post.components.splice(idx, 1);
        updatePost();
    };

    return (
    <div id="components" className={styles.components}>
        {
        post.components.map((component, idx) =>
            <div className={styles.componentWrapper} key={ idx } >
                <PostControls 
                    handleCreate={   () => setComponentModal(idx) }
                    handleDelete={   () => handleDelete(idx) }
                    handleMoveUp={   () => handleMoveUp(idx) }
                    handleMoveDown={ () => handleMoveDown(idx) } />
                <PostComponent 
                    editable={ true }
                    component={ component }
                    setContent={ (data) => setComponentContent(idx, data) }/>
            </div>
        )}
        { componentModal != null && 
        <ComponentMenu 
            closeFunction={() => setComponentModal(null)} 
            createComponent={ (newComponent) => handleCreate(componentModal, newComponent) } /> }
    </div>
    );
}