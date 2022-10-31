import { useRef, useState } from "react"; 
import Layout from "pages/components/layout";
import { validateEmail } from "pages/api/utils";
import { useSession } from "next-auth/react";
import { handleLogin } from "./utils";

export default function SignUp({ }) {
    const form = useRef(null);
    const [signUpError, setSignUpError] = useState();
    const { data: session, status } = useSession();
    
    if(status == "authenticated")
        window.location.replace("/user/" + session.user.username);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = form.current.user;
        const email = form.current.email;
        const password = form.current.pass;
        const confirmPassword = form.current.confirmPass;
    
        if(!validateEmail(email.value)) {
            setSignUpError("Invalid email address.");
            return;
        }
    
        // TODO: better password validation
        if(password.value != confirmPassword.value) {
            setSignUpError("Passwords do not match.");
            return;
        }
    
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username.value,
                email: email.value,
                password: password.value,
            }),
        })
    
        const result = await res.json();
    
        if(result.ok) {
            const loginResult = await handleLogin(username.value, password.value);

            if(loginResult.ok) {
                window.location.href = "/user/" + username.value;
            } else {
                setSignUpError("Account created, failed to log in.");
            }
        } else {
            setSignUpError(result.message);
        }
    }

    return (
    <>
        <Layout title="Dev Gallery | Sign Up">
            <h3>Sign up:</h3>
            <a href="/auth/login">Click here to log in.</a>
            <form ref={ form } onSubmit={ handleSubmit }>
                <label name="user">Username:</label><br />
                <input name="user" type="text" /><br />

                <label name="email">Email:</label><br />
                <input name="email" emailtype="text" /><br />

                <label name="pass">Password:</label><br />
                <input name="pass" type="password" /><br />
                
                <label name="confirmPass">Confirm Password:</label><br />
                <input name="confirmPass" type="password" /><br /><br />
                
                <input type="submit" value="Submit" />
            </form>

            { signUpError && (
                <p>{ signUpError }</p>
            )}
        </Layout>
    </>
    );
}

export async function getStaticProps(context) {    
    return {
        props: {
        },
    }
}