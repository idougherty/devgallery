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
                var comments = await db.collection("comments")
                    .find({ post_id: oid, parent_id: new ObjectId("000000000000000000000000") })
                    .sort({ createdDate: 1 })
                    .toArray();
        
                for (var comment of comments) {
                    comment.author = await db.collection("users")
                        .findOne({ _id: comment.author_id }); 
        
                    comment.replies = await db.collection("comments")
                        .find({ parent_id: comment._id })
                        .sort({ createdDate: 1 })
                        .toArray();
        
                    for (var reply of comment.replies) {
                        reply.author = await db.collection("users")
                            .findOne({ _id: reply.author_id }); 
        
                        // TODO: probs wanna format this in another way.
                        reply.formattedDate = new Date(reply.createdDate).toUTCString();     
                    }
        
                    // TODO: probs wanna format this in another way.
                    comment.formattedDate = new Date(comment.createdDate).toUTCString();       
                };
            
                res.status(200).json(comments);
                break;
            case "POST":
                const body = JSON.parse(req.body);

                body.post_id = oid;
                body.parent_id = new ObjectId(body.parent_id);
                body.createdDate = new Date(body.createdDate);
                
                const comment = await db.collection("comments").insertOne(body);

                res.status(200).json(comment);
                break;
        }       
    } catch(error) {
        console.log(error);
        res.status(500).json({error: 500, message: "oops"});
    } finally {
        await client.close();
    }
}