import styles from "styles/modal.module.css";
import { BiX } from "react-icons/bi";

export default function Modal({ children, title, closeFunction, strictClose }) {
    const wrapperClose = strictClose ? {} : {
        onClick: closeFunction
    };

    return (
    <div className={styles.modalWrapper} { ...wrapperClose }>        
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

            <div className={styles.topbar}>
                <h3>{ title }</h3>
                <BiX onClick={ closeFunction } />
            </div>

            { children }
        </div>
    </div>
    );
}
