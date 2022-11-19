import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import LoadingPage from "../loadingPage";
import SignInModal from "./signInModal";

export default function AuthGuard({ children, pageProps, verifyAuth }) {
    const { data: session, status } = useSession();
    const router = useRouter()

    if (status == "loading")
        return <LoadingPage />;
    
    if (status != "loading" && !session)
        return <SignInModal closeSignIn={ () => router.push("/") }/>;

    if(verifyAuth) {
        const { valid, redirectUrl } = verifyAuth(pageProps, session.user);

        if(!valid) {
            router.push(redirectUrl);
            return <LoadingPage />;
        }
    }

    return <>{ children }</>
}