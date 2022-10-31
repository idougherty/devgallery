import Layout from "pages/components/layout";
import { signIn, getProviders, getCsrfToken, useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { handleLogin } from "./utils";

export default function Login({ providers, csrfToken }) {
    const form = useRef(null);
    const [authError, setAuthError] = useState("");
    const { data: session, status } = useSession();
    
    console.log(session);
    if(status == "authenticated")
        window.location.replace("/user/" + session.user.username);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = form.current.user;
        const password = form.current.pass;

        const result = await handleLogin(user.value, password.value);

        if(result.ok) {
            form.current.reset();
        } else if(result.status == 401) {
            setAuthError("Log in failed, please check credentials.");
        } else {
            setAuthError("There was an internal error, please try again later.");
        }
    };

    return (
    <>        
        <Layout title="Dev Gallery | Login">
            <h3>Login:</h3>

            <a href="/auth/signup">Click here to sign up.</a>

            {Object.values(providers).map((provider) => 
                (provider.id != "credentials") &&
                (<div key={provider.name}>
                    <button onClick={() => signIn(provider.id)}>
                        Sign in with {provider.name}
                    </button>
                </div>)
            )}

            <form ref={ form } onSubmit={ handleSubmit }>
                <input name="csrfToken" type="hidden" defaultValue={ csrfToken } />
                <label name="user">Username or Email:</label><br />
                <input name="user" type="text" /><br />

                <label name="pass">Password:</label><br />
                <input name="pass" type="password" /><br /><br />

                <input type="submit" value="Submit" />
            </form>

            { authError && (
                <p>{ authError }</p>
            )}
        </Layout>
    </>
    );
}

export async function getStaticProps(context) {    
    return {
        props: {
            csrfToken: await getCsrfToken(context),
            providers: await getProviders(),
        },
    }
}