import NavBar from "pages/components/navbar";
import Head from "next/head";

export default function Layout({ children, ...props }) {
    return (
    <>
        <Head>
            <title>{ props.title || "Dev Gallery" }</title>
            <meta name="description" content="Share your projects with a community of CS tinkerers."></meta>
        </Head>

        <NavBar />
        
        <main>{ children }</main>
    </>
    )
}