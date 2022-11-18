import getClient from "pages/api/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if(req.method != "POST")
        return res.status(400).json({ error: 400, message: "Invalid request type." });

    const { author_id } = req.body;

    if(!author_id)
        return res.status(422).json({ error: 422, message: "Update failed, please include a title and description." });

    // TODO: authenticate user

    const client = getClient();
    try {
        await client.connect();
        const db = client.db("devgallery");

        const post_id = ObjectId();

        const postRes = await db.collection("posts")
            .insertOne({ 
                _id: post_id,
                title: "Untitled Post",
                description: "A new post.",
                author_id: ObjectId(author_id),
                components: [],
            });

        if(!postRes.acknowledged)
            throw null;

        const userRes = await db.collection("users")
            .updateOne(
                { _id: ObjectId(author_id) },
                { $push: { 
                    post_ids: ObjectId(), 
                }},
                { upsert: false }
            );

        if(!userRes.acknowledged)
            throw null;
        
        res.status(201).json({ ok: true, status: 201, message: post_id });
    } catch(error) {
        console.log(error);

        if(error.status)
            res.status(error.status).json(error);
        else
            res.status(500).json({ ok: false, status: 500, message: "Internal error." });
    } finally {
        await client.close();
    }
}