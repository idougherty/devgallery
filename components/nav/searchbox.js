import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import styles from "styles/searchbox.module.css";

export default function SearchBox() {
    const form = useRef();
    const router = useRouter();
    const { query } = router.query;

    const handleSearch = (e) => {
        e.preventDefault();

        const input = form.current.input.value;

        if(window.location.pathname != "/search")
            window.location.href = "/search?query=" + input;
    }

    return (
    <>
        <form className={styles.form} ref={form} onSubmit={ handleSearch }>
            <input  name="input" 
                    type="text" 
                    placeholder="Search..." 
                    defaultValue={ query }
                    className={styles.input} />
            <BiSearchAlt className={styles.icon}/>
        </form>
    </>
    );
}