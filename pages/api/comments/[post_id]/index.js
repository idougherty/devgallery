import getClient from "pages/api/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { post_id } = req.query; 
    const client = getClient();

    try {
        await client.connect();
        const db = client.db("devgallery");
        const oid = new ObjectId(post_id);

        switch(req.method) {
            case "GET":
                // const comments = await db.collection("comments")
                //     .find({ post_id: oid, parent_id: null })
                //     .sort({ createdDate: 1 })
                //     .toArray();
        
                // for (const comment of comments) {
                //     comment.replies = await db.collection("comments")
                //         .find({ parent_id: comment._id })
                //         .sort({ createdDate: 1 })
                //         .toArray();      
                // };
                const comments = await getComments(post_id);
            
                res.status(200).json(comments);
                break;
            case "POST":
                const body = JSON.parse(req.body);

                body._id = ObjectId();
                body.post_id = oid;
                body.parent_id = body.parent_id && ObjectId(body.parent_id);
                body.createdDate = new Date(body.createdDate);
                
                await db.collection("comments").insertOne(body);

                body.replies = [];

                res.status(200).json({ ok: true, status: 200, message: body });
                break;
            case "DELETE":
                //TODO: delete comments
                const { _id } = JSON.parse(req.body);

                await db.collection("comments")
                    .deleteMany({$or: [
                        { _id: ObjectId(_id) },
                        { parent_id: ObjectId(_id) }
                    ]});

                res.status(200).json({ ok: true, status: 200, message: "Success." });
                break;
        }       
    } catch(error) {
        console.log(error);
        res.status(500).json({ ok: false, status: 500, message: "Internal error." });
    } finally {
        await client.close();
    }
}

export async function getComments(post_id) {
    let res;
    const client = getClient();

    try {
        await client.connect();
        const db = client.db("devgallery");
        const oid = ObjectId(post_id);

        const comments = await db.collection("comments")
            .find({ post_id: oid, parent_id: null })
            .sort({ createdDate: 1 })
            .toArray();

        for (const comment of comments) {
            comment.replies = await db.collection("comments")
                .find({ parent_id: comment._id })
                .sort({ createdDate: 1 })
                .toArray();      
        };

        res = comments;
    } catch(error) {
        console.log(error);
        res = { error: 500, message: "oops" };
    } finally {
        await client.close();
    }

    return JSON.parse(JSON.stringify(res));
}