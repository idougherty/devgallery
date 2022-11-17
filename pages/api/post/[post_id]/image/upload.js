import getClient from "pages/api/db";
import { Binary, ObjectId } from "mongodb";

export default async function handler(req, res) {
    if(req.method != "POST")
        return res.status(400).json({ error: 400, message: "Invalid request type." });

    const { post_id } = req.query; 
    const { filename, data, size, type } = req.body;

    const client = getClient();
    try {
        await client.connect();
        const db = client.db("devgallery");

        const checkPost = await db.collection("posts")
            .findOne({ _id: ObjectId(post_id) });
        
        if(!checkPost)
            throw null;

        const imageBuffer = Buffer.from(data);

        const oid = new ObjectId();
        await db.collection("images")
            .insertOne({
                _id: oid,
                post_id: post_id,
                filename: filename,
                size: size,
                type: type,
                data: Binary(imageBuffer),
            });

        res.status(201).json({ ok: true, status: 201, message: oid });
    } catch(error) {
        console.log(error);

        if(error?.status)
            res.status(error.status).json(error);
        else
            res.status(500).json({ ok: false, status: 500, message: "Internal error." });
    } finally {
        await client.close();
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb' // Set desired value here
        }
    }
}