import Head from "next/head";
import NavBar from "pages/components/navbar";

function Home({ posts }) {
    return (
    <>
        <Head>
            <title>Dev Gallery</title>
            <meta name="description" content="Share your projects with a community of CS tinkerers."></meta>
        </Head>
        
        <NavBar></NavBar>
        
        <div>
            <h3>All Posts:</h3>
            <ul>
            {
                posts.map(post =>
                    <li>
                        <a href={process.env.BASE_URL + "/posts/" + post.id }>
                            { post.title }
                        </a>
                    </li>
                )
            }
            </ul>
        </div>
    </>
    );
}

export default Home;
  
export async function getStaticProps(context) {
    const res = await fetch(process.env.BASE_URL + "/api/posts/");
    const posts = await res.json();
    
    return {
        props: {
            posts,
        },
    }
}