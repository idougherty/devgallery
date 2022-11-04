import { useEffect, useRef, useState } from "react";
import { getProviders, signIn } from "next-auth/react";

export default function SignInModal({ closeSignIn }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [providers, setProviders] = useState([]); 
    
    useEffect(() => {
        getProviders().then((data) => {
            setLoading(false);
            setProviders(data);
        }).catch(() => {
            setLoading(false);
            setError("Something went wrong fetching providers.");
        });
    }, []);
    
    return (
    <div>
        <h3>Sign In:</h3>

        {loading && (
            <p>Loading...</p>
        ) || error && (
            <p>{ error }</p>
        ) || (
        Object.values(providers).map((provider) => 
            (provider.id != "credentials") &&
            (<div key={provider.name}>
                <button onClick={ () => signIn(provider.id) }>
                    Sign in with {provider.name}
                </button>
            </div>)
        )
        )}

        <button onClick={ closeSignIn }> Close! </button>
    </div>
    );
}