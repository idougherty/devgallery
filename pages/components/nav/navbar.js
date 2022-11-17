import { useSession, signOut } from "next-auth/react";
import SearchBox from "./searchbox";
import styles from 'styles/navbar.module.css';
import { BiLoaderAlt } from "react-icons/bi";

export default function NavBar({ openLogin }) {
    const { data: session, status } = useSession();

    return (
    <div className={styles.navbar}>
        <ul className={styles.navbarContent}>
            <li className={styles.title}>
                <a href={"/"}><h1>Dev Gallery</h1></a>
            </li>
            <li className={styles.center}><SearchBox /></li>
            { status == "loading" && ( 
                <li className={styles.right}>
                    <BiLoaderAlt className="spinner" fontSize="x-large" />
                </li>
            ) || !session && status != "loading" && ( 
                <li className={styles.right} onClick={ openLogin }>
                    <a href="#">Login</a>
                </li>
            ) || (
                <li className={styles.right}>
                    { session?.user?.valid &&
                        <a href={"/user/"+session.user.username}>Your profile</a>
                    }
                    { session &&
                        <a href="#" onClick={ signOut }>Logout</a>
                    }
                </li>
            )}
        </ul>
    </div>
    );
}