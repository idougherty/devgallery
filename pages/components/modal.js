import styles from "styles/modal.module.css";
import { BiX } from "react-icons/bi";

export function Modal({ children, title, closeFunction }) {
    return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        <div className={styles.topbar}>
            <h3>{ title }</h3>
            <BiX onClick={ closeFunction } />
        </div>

        { children }
    </div>
    );
}

export function ModalWrapper({ children, closeFunction }) {
    return (
        <div className={styles.modalWrapper} onClick={ closeFunction }>
            { children }
        </div>
    )
}
