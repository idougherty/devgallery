import getClient from "pages/api/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { img_id } = req.query; 
    const client = getClient();

    try {
        await client.connect();
        const db = client.db("devgallery");

        const oid = new ObjectId(img_id);
        const image = await db.collection("images")
            .findOne({ _id: oid });
            
        if(!image)
            throw null;

        const data = Buffer.from(image.data.value(), 'base64');

        res.writeHead(200, {
            'Content-Type': image.type,
            'Content-Length': data.length,
        });
        res.status(200).end(data);
    } catch(error) {
        console.log(error);
        res.status(500).json({error: 500, message: "oops"});
    } finally {
        await client.close();
    }
}