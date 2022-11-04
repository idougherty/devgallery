import { signOut, useSession } from "next-auth/react";
import { useRef, useState } from "react";

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
    <div>
        <h3>Sign Up:</h3>

        <form ref={ form } onSubmit={ handleSignUp }>
            <label name="user">Username:</label><br />
            <input name="user" type="text" /><br />
            <label name="school">School:</label><br />
            <input name="school" type="text" /><br /><br />

            <input type="submit" />
        </form>

        { error && <p>{ error }</p>}

        <button onClick={ handleClose }> Close! </button>
    </div>
    );
}