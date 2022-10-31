import { useSession, signOut } from "next-auth/react";

export default function NavBar() {
    const { data: session, status } = useSession();

    return (
        <div>
            <h1>Dev Gallery</h1>
            <ul>
                <li><a href={"/"}>Home</a></li>
                <li><a href={"/search"}>Search</a></li>
                { !session && !(status == "authenticated") && ( 
                    <li><a href={"/auth/login"}>Login</a></li>
                )}
                { session && (
                    <li><a href={"/user/"+session.user.username}>Your profile</a></li>
                )}
                { session && (
                    <li onClick={ signOut }>Logout</li>
                )}
            </ul>
        </div>
    );
}