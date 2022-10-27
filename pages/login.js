import Head from "next/head";
import NavBar from "pages/components/navbar";

function Search({ }) {
    return (
    <>
        <Head>
            <title>Dev Gallery | Login</title>
            <meta name="description" content="Share your projects with a community of CS tinkerers."></meta>
        </Head>
        
        <NavBar></NavBar>
        
        <div>
            <h3>Login:</h3>
            <form>
                <label name="username">Username:</label><br />
                <input name="username" type="text" /><br />
                <label name="password">Password:</label><br />
                <input name="password" type="password" /><br /><br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    </>
    );
}

export default Search;
  
export async function getStaticProps(context) {
    // const res = await fetch(process.env.BASE_URL + "/api/posts/");
    // const posts = await res.json();
    
    return {
        props: {
        },
    }
}