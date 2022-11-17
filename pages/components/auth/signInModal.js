import { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { Modal, ModalWrapper } from "../modal";
import styles from "styles/auth.module.css";

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
    <ModalWrapper onClick={ closeSignIn }>
        <Modal title="Sign In With:" closeFunction={ closeSignIn }>
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
        </Modal>
    </ModalWrapper>
    );
}