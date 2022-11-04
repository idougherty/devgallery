import { useSession, signOut } from "next-auth/react";

export default function NavBar({ openLogin }) {
    const { data: session, status } = useSession();

    return (
        <div>
            <h1>Dev Gallery</h1>
            <ul>
                <li><a href={"/"}>Home</a></li>
                <li><a href={"/search"}>Search</a></li>
                { !session && status != "loading" && ( 
                    <li onClick={ openLogin }>Login</li>
                )}
                { session?.user?.valid && (
                    <li><a href={"/user/"+session.user.username}>Your profile</a></li>
                )}
                { session && (
                    <li onClick={ signOut }>Logout</li>
                )}
            </ul>
        </div>
    );
}