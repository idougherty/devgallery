import getClient from "pages/api/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if(req.method != "POST")
        return res.status(400).json({ error: 400, message: "Invalid request type." });

    const post = req.body;

    if(!post.title || !post.description)
        return res.status(422).json({ error: 422, message: "Update failed, please include a title and description." });

    for(const component of post.components) {
        if(component != "image group")
            continue;

        for(const image of component.images) {
            console.log(image);
        }
    }

    const client = getClient();
    try {
        await client.connect();
        const db = client.db("devgallery");

        await db.collection("posts")
            .updateOne(
                { _id: ObjectId(post._id) },
                { $set: {
                    title: post.title,
                    description: post.description,
                    components: post.components,
                }},
                {
                    upsert: false,
                }
            );

        res.status(201).json({ ok: true, status: 201, message: "Post content updated." });
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