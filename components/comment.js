import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { BiReply, BiTrash } from "react-icons/bi";
import styles from "styles/comment.module.css";

export default function Comment({ comment, postReply, deleteComment, isReply = false }) {
    const { data: session } = useSession();
    const [showReplyBox, setShowReplyBox] = useState(false);
    const commentInput = useRef(null);
    const [error, setError] = useState("");

    const submitReply = async () => {
        const data = await postReply({
            post_id: comment.post_id,
            author_id: session.user._id,
            author_name: session.user.username,
            content: commentInput.current.value,
            createdDate: Date.now(),
            parent_id: comment.parent_id || comment._id,
            reply_author: comment.author_name,
        });

        if(data.ok) {
            commentInput.current.value = "";
            setShowReplyBox(false);
        } else {
            setError("There was an error submitting this comment. :(");
        }
    }

    return (
        <>
        <div className={styles.comment} style={{ marginLeft: isReply ? "25px" : "0px" }}>
            <div className={styles.commentHeader}>
                <h4>{comment.author_name}</h4>
                {isReply && 
                    <h4 className={styles.replyName}>@{comment.reply_author}</h4>
                }
                { session?.user && !showReplyBox && 
                <BiReply onClick={() => setShowReplyBox(true)}
                         className={styles.replyBtn}/>
                }
                { session?.user._id == comment.author_id && 
                <BiTrash onClick={() => deleteComment(comment)}
                         className={styles.deleteBtn}/>
                }

                <p>{new Date(comment.createdDate).toDateString()}</p>
            </div>
            <p>{comment.content}</p>
        </div>

        { showReplyBox && 
        <div className={styles.comment} style={{ marginLeft: "25px" }}>
            <div align="right" className={styles.reply}>
                <textarea ref={ commentInput }
                            className={styles.commentBox} 
                            placeholder="Enter a comment here..." />

                <button className={styles.cancelBtn} onClick={() => {setShowReplyBox(false)}}>Cancel</button>
                <button className={styles.submitBtn} onClick={submitReply}>Submit</button>
                { error && <p>{ error }</p> }
            </div> 
        </div>
        }
        </>
    )
}