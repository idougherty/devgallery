import NavBar from "pages/components/nav/navbar";
import SignInModal from "pages/components/auth/signInModal";
import SignUpModal from "pages/components/auth/signUpModal";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Layout({ children, auth, ...props }) {
    const [signInModal, setSignInModal] = useState(false);
    const [signUpModal, setSignUpModal] = useState(false);
    const { data: session, status } = useSession();

    if(!signUpModal && session && !session.user?.valid)
        setSignUpModal(true);

    return (
    <>
        <Head>
            <title>{ props.title || "Dev Gallery" }</title>
            <meta name="description" content="Share your projects with a community of CS tinkerers."></meta>
        </Head>

        <NavBar openLogin={ () => setSignInModal(true) }/>
        
        {signInModal && !session && 
        <SignInModal closeSignIn={ () => setSignInModal(false) } />}
        
        {signUpModal && <SignUpModal closeSignUp={ () => setSignUpModal(false) } />}

        <main className="container">{ children }</main>
    </>
    )
}