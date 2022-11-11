import styles from "styles/post.module.css";
import {
    BiCaretUp,
    BiCaretDown,
    BiTrash,
    BiPlus,
} from "react-icons/bi";

export default function PostComponent({ component, editingData }) {
    switch(component.type) {
        case "paragraph":
            return (
            <PostComponentWrapper 
                editingData={ editingData }>
                <p contentEditable={ editingData != null } suppressContentEditableWarning>
                    { component.content }
                </p>
            </PostComponentWrapper>
            );
        case "header":
            return (
            <PostComponentWrapper
                editingData={ editingData }>
                <h3 contentEditable={ editingData != null } suppressContentEditableWarning>
                    { component.content }
                </h3>
            </PostComponentWrapper>
            );
        default:
    }
}

function PostComponentWrapper({ children, editingData }) {
    return (
    <div className={styles.postWrapper}>
        { editingData != null && 
        <PostControls editingData={ editingData } />
        }

        { children }
    </div>
    )
}

function PostControls({ editingData }) {
    const { post, updatePostData, componentIdx } = editingData;

    const handleMoveUp = () => {
        if(componentIdx == 0)
            return;

        const tmp = post.components[componentIdx];
        post.components[componentIdx] = post.components[componentIdx - 1]
        post.components[componentIdx - 1] = tmp;

        updatePostData(post);
    };

    const handleMoveDown = () => {
        if(componentIdx == post.components.length - 1)
            return;

        const tmp = post.components[componentIdx];
        post.components[componentIdx] = post.components[componentIdx + 1]
        post.components[componentIdx + 1] = tmp;

        updatePostData(post);
    };

    const handleCreate = () => {
        const newComponent = {
            type: "paragraph",
            content: "New paragraph!"
        }

        post.components.splice(componentIdx + 1, 0, newComponent);
        updatePostData(post);
    };

    const handleDelete = () => {
        post.components.splice(componentIdx, 1);
        updatePostData(post);
    };

    return (
    <div className={styles.postControlsWrapper}>
        <div className={styles.postControlsExtender}></div>
        <div className={styles.postControls}>
            <BiCaretUp onClick={ handleMoveUp } className={styles.control} />
            <BiPlus onClick={ handleCreate } className={styles.control} />
            <BiTrash onClick={ handleDelete } className={styles.control} />
            <BiCaretDown onClick={ handleMoveDown } className={styles.control} />
        </div>
    </div>
    )
}