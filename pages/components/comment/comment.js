import { useState } from "react";
import styles from "styles/comment.module.css";

export default function Comment({ comment, isReply = false }) {
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [replyText, setReplyText] = useState("");

    // TODO: reload page or something on submission
    const submitReply = async () => {
        await fetch(`/api/comments/${comment.post_id}/`, {
            method: "POST",
            body: JSON.stringify({
                post_id: comment.post_id,
                author_id: "", // TODO: get author_id somehow...
                content: replyText,
                createdDate: Date.now(),
                parent_id: comment._id
            }),
        })
    }

    return (
        <div className={styles.comment} style={{ marginLeft: isReply ? "25px" : "0px" }}>
            <h4>{comment.author?.username}</h4>
            <h4>{comment.formattedDate}</h4>
            <p>{comment.content}</p>
            { !isReply && !showReplyBox ? <button onClick={() => setShowReplyBox(true)}>Reply</button> : null }
            { showReplyBox ? <div align="right" className={styles.reply}>
                <textarea onChange={e => { setReplyText(e.currentTarget.value); }} className={styles.commentBox} placeholder="Enter a comment here..."></textarea>
                <button className={styles.cancelBtn} onClick={() => {setShowReplyBox(false)}}>Cancel</button>
                <button onClick={submitReply}>Submit</button>
            </div> : null }
        </div>
    )
}