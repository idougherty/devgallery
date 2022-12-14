import NavBar from "components/nav/navbar";
import SignInModal from "components/auth/signInModal";
import SignUpModal from "components/auth/signUpModal";
import Head from "next/head";
import Footer from "./footer";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Layout({ children, auth, ...props }) {
    const [signInModal, setSignInModal] = useState(false);
    const [signUpModal, setSignUpModal] = useState(false);
    const { data: session, status } = useSession();

    if(!signUpModal && session && !session.user?.valid)
        setSignUpModal(true);

    return (
    <div className="layout">
        <Head>
            <title>{ props.title || "Dev Gallery" }</title>
            <meta name="description" content="Share your projects with a community of CS tinkerers."></meta>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;1,300&display=swap" rel="stylesheet" />
        </Head>

        <NavBar openLogin={ () => setSignInModal(true) }/>
        
        {signInModal && !session && 
        <SignInModal closeSignIn={ () => setSignInModal(false) } />}
        
        {signUpModal && <SignUpModal closeSignUp={ () => setSignUpModal(false) } />}

        <main className="container">{ children }</main>

        <Footer />
    </div>
    )
}