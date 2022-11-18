import getClient from "pages/api/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { post_id } = req.query; 
    const post = getPost(post_id)

    console.log(post);

    if(!post.error)
        res.status(200).json(post);
    else
        res.status(500).json(post);
}

export async function getPost(post_id) {
    let res;
    const client = getClient();

    try {
        await client.connect();
        const db = client.db("devgallery");

        const oid = new ObjectId(post_id);
        const post = await db.collection("posts")
            .findOne({ _id: oid });
            
        post.author = await db.collection("users")
            .findOne({ _id: post.author_id });

        res = post;
    } catch(error) {
        console.log(error);
        res = { error: 500, message: "oops" };
    } finally {
        await client.close();
    }

    return JSON.parse(JSON.stringify(res));
}