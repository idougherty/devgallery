import styles from "styles/post.module.css";
import {
    BiCaretUp,
    BiCaretDown,
    BiTrash,
    BiPlus,
} from "react-icons/bi";

export default function PostControls({ handleMoveUp, handleMoveDown, handleCreate, handleDelete }) {
    return (
    <div className={ styles.postControlsWrapper }>
        <div className={ styles.postControlsExtender }></div>
        <div className={ styles.postControls }>
            <BiCaretUp onClick={ handleMoveUp } />
            <BiPlus onClick={ handleCreate } />
            <BiTrash onClick={ handleDelete } />
            <BiCaretDown onClick={ handleMoveDown } />
        </div>
    </div>
    )
}