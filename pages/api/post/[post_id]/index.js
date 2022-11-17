import getClient from "pages/api/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { post_id } = req.query; 
    const client = getClient();

    try {
        await client.connect();
        const db = client.db("devgallery");

        const oid = new ObjectId(post_id);
        const post = await db.collection("posts")
            .findOne({ _id: oid });
            
        post.author = await db.collection("users")
            .findOne({ _id: post.author_id });

        res.status(200).json(post);
    } catch(error) {
        console.log(error);
        res.status(500).json({error: 500, message: "oops"});
    } finally {
        await client.close();
    }
}