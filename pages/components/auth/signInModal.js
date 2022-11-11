import { useEffect, useRef, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { BiX } from "react-icons/bi";
import styles from "styles/modal.module.css";

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
    <div className={styles.modalWrapper} onClick={ closeSignIn }>
        <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
            <div className={styles.topbar}>
                <h3>Sign In With: </h3>
                <BiX onClick={ closeSignIn } />
            </div>

            {loading && (
                <p>Loading...</p>
            ) || error && (
                <p>{ error }</p>
            ) || 
            <div className={styles.providers}>
            {
            Object.values(providers).map((provider) => 
                <div key={provider.name}>
                    <img className={styles.authButton} 
                         onClick={ () => signIn(provider.id) } 
                         src={`/icons/${provider.name.toLowerCase()}.svg`} />
                </div>
            )
            }
            </div>
            }
        </div>
    </div>
    );
}