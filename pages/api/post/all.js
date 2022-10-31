import getClient from "pages/api/db";

export default async function handler(req, res) {
    const client = getClient();

    try {
        await client.connect();

        const posts = await client.db("devgallery")
            .collection("posts").find().toArray();

        res.status(200).json(posts);
    } catch(error) {
        console.log(error);
        res.status(500).json({error: 500, message: "oops"});
    } finally {
        await client.close();
    }
}