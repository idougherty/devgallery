import styles from "styles/post.module.css";

export default function HeaderComponent({ component, editable, setContent }) {

    const handleChange = (e) => {
        const newContent = e.target.innerText;
        setContent(newContent);
    }

    const editingProps = !editable ? {} : {
        onBlur: handleChange,
        contentEditable: true,
        suppressContentEditableWarning: true
    };

    return (
        <h3 className={ styles.component }
            { ...editingProps }>
            { component.content }
        </h3>
    );
}

export function createHeader() {
    return {
        type: "header",
        content: "New Header:",
    }
}