import styles from "styles/post.module.css";

export default function ParagraphComponent({ component, editable, setContent }) {
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
        <p className={ styles.component }
           { ...editingProps }>
            { component.content }
        </p>
    );
}

export function createParagraph() {
    return {
        type: "paragraph",
        content: "New paragraph!",
    }
}