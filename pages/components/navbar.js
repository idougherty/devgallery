function NavBar() {
    const base = process.env.BASE_URL;

    return (
        <div>
            <h1>Dev Gallery</h1>
            <ul>
                <li><a href={base}>Home</a></li>
                <li><a href={base + "/search"}>Search</a></li>
                <li><a href={base + "/login"}>Login</a></li>
            </ul>
        </div>
    );
}

export default NavBar;