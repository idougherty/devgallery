import Modal from "components/modal";
import { BiParagraph, BiText, BiImages } from "react-icons/bi";
import { createParagraph } from "./componentTypes/paragraph";
import { createHeader } from "./componentTypes/header";
import { createImageGroup } from "./componentTypes/imageGroup";
import styles from "styles/post.module.css";

export default function ComponentMenu({ closeFunction, createComponent }) {
    return (
    <Modal title="Insert new component:" closeFunction={ closeFunction }>
        <div className={styles.componentMenu}>
            <div className={styles.menuItem}>
                <button onClick={ () => createComponent(createParagraph()) }>
                    <h4><BiParagraph /> Paragraph</h4>
                </button>
            </div>
            <div className={styles.menuItem}>
                <button onClick={ () => createComponent(createHeader()) }>
                    <h4><BiText /> Header</h4>
                </button>
            </div>
            <div className={styles.menuItem}>
                <button onClick={ () => createComponent(createImageGroup()) }>
                    <h4><BiImages /> Image Group</h4>
                </button>
            </div>
        </div>
    </Modal>
    );
}