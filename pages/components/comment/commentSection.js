import { useSession } from "next-auth/react";
import Comment from "../../components/comment/comment";
import styles from "styles/comment.module.css";
import { useState } from "react";

export default function CommentSection({ comments, post_id }) {
    const { data: session } = useSession();
    const [commentText, setCommentText] = useState("");

    // TODO: reload page or something on submission
    const submitComment = async () => {
        await fetch(`/api/comments/${post_id}/`, {
            method: "POST",
            body: JSON.stringify({
                post_id: post_id,
                author_id: "", // TODO: get author_id somehow...
                content: commentText,
                createdDate: Date.now(),
                parent_id: "000000000000000000000000"
            }),
        })
    }

    return (
        <div>
            <h3>Comments ({ comments.length })</h3>
            { session?.user?.valid &&
                <div align="right" className={styles.reply}>
                    <textarea onChange={e => { setCommentText(e.currentTarget.value); }} className={styles.commentBox} placeholder="Enter a comment here..."></textarea>
                    <button onClick={submitComment}>Submit</button>
                </div>
            }
            <div>
                { comments.map((comment, idx) =>
                    <div>
                        <Comment comment={comment} key={idx} />
                        { comment.replies.map((reply, idx2) =>
                            <Comment comment={reply} isReply={true} key={idx2} />
                        ) }
                    </div> 
                )}
            </div>
        </div>
    )
}