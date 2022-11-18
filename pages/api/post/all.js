import getClient from "pages/api/db";

export default async function handler(req, res) {
    const posts = getAllPosts();

    if(!posts.error)
        res.status(200).json(posts);
    else
        res.status(500).json(posts);
}

export async function getAllPosts() {
    let res;
    const client = getClient();

    try {
        await client.connect();

        res = await client.db("devgallery")
            .collection("posts").find().toArray();

    } catch(error) {
        console.log(error);
        res = { error: 500, message: "oops" };
    } finally {
        await client.close();
    }

    return  JSON.parse(JSON.stringify(res));
}