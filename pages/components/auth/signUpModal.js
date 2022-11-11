import { signOut, useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { BiX } from "react-icons/bi";
import styles from "styles/modal.module.css";

export default function SignUpModal({ closeSignUp }) {
    const form = useRef(null);
    const [ error, setError ] = useState("");
    const { data: session, status } = useSession();

    const handleSignUp = async (e) => {
        e.preventDefault();

        const username = form.current.user.value;
        const school = form.current.school.value;
        
        const newData = {
            username: username,
            email: session.user.email,
            school: school,
        };

        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
        })
        
        const data = await res.json();
        
        if(data.ok) {
            // force session refresh
            window.location.reload();
        } else {
            setError(data.message);
        }

    };

    const handleClose = async () => {
        await signOut();
        closeSignUp();
    }
    
    return (
    <div className={styles.modalWrapper}>
        <div className={styles.modal}>
            <div className={styles.topbar}>
                <h3>Sign Up:</h3>
                <BiX onClick={ handleClose } />
            </div>

            <form ref={ form } onSubmit={ handleSignUp }>
                <label className={styles.label} name="user">Username:</label><br />
                <input className={styles.input} name="user" type="text" /><br /><br />
                <label className={styles.label} name="school">School:</label><br />
                <input className={styles.input} name="school" type="text" /><br />
                <p className={styles.error}>{ error }&nbsp;</p>

                <input className={styles.submit} type="submit" />
            </form>
        </div>
    </div>
    );
}