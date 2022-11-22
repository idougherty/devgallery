import { useSession } from "next-auth/react";
import Comment from "./comment";
import styles from "styles/comment.module.css";
import { useRef, useState } from "react";

export default function CommentSection({ commentData, post_id }) {
    const { data: session } = useSession();
    const commentInput = useRef(null);
    const [comments, setComments] = useState(commentData);
    const [error, setError] = useState("");

    const postComment = async (data) => {
        const res = await fetch(`/api/comments/${post_id}/`, {
            method: "POST",
            body: JSON.stringify(data),
        });

        return await res.json();
    }

    const submitComment = async () => {
        const data = await postComment({
            post_id: post_id,
            author_id: session.user._id,
            author_name: session.user.username,
            content: commentInput.current.value,
            createdDate: Date.now(),
            parent_id: null,
            parent_author: null,
        });

        if(data.ok) {
            comments.push(data.message);
            commentInput.current.value = "";
            setComments([...comments]);
        } else {
            setError("There was an error submitting this comment. :(");
        }
    }

    const postReply = async (reply) => {
        const data = await postComment(reply);

        if(data.ok) {
            const parent = comments.find(el => data.message.parent_id == el._id);

            parent.replies.push(data.message);
            setComments([...comments]);
        }

        return data;
    }

    const deleteComment = async (comment) => {
        const res = await fetch(`/api/comments/${post_id}/`, {
            method: "DELETE",
            body: JSON.stringify({ _id: comment._id }),
        });

        const data = await res.json();

        if(data.ok) {
            if(comment.parent_id) {
                const parent = comments.find(el => comment.parent_id == el._id);

                if(!parent)
                    return;

                const idx = parent.replies.findIndex(el => comment._id == el._id);

                if(idx >= 0) {
                    parent.replies.splice(idx, 1);
                    setComments([...comments]);
                }
            } else {
                const idx = comments.findIndex(el => comment._id == el._id);
    
                if(idx >= 0) {
                    comments.splice(idx, 1);
                    setComments([...comments]);
                }
            }
        }
    }

    return (
        <div style={{marginTop:"80px"}}>
            <h3>Comments ({ comments.length })</h3>
            { session?.user?.valid &&
                <div align="right" className={styles.reply}>
                    <textarea ref={commentInput} 
                              className={styles.commentBox} 
                              placeholder="Enter a comment here..."></textarea>

                    <button onClick={submitComment} className={styles.submitBtn}>Submit</button>
                    { error && <p>{ error }</p> }
                </div>
            }
            <div>
                { comments.map((comment, idx) =>
                    <div key={idx}>
                        <Comment comment={comment} 
                                 postReply={postReply}
                                 deleteComment={deleteComment}/>
                        { comment.replies.map((reply, idx) =>
                            <Comment comment={reply} 
                                     postReply={postReply} 
                                     isReply={true} 
                                     deleteComment={deleteComment}
                                     key={idx} />
                        ) }
                    </div> 
                )}
            </div>
        </div>
    )
}