import getClient from "pages/api/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { username } = req.query; 
    const client = getClient();

    try {
        await client.connect();

        const db = client.db("devgallery");
        const user = await db.collection("users")
            .findOne(
                { username: username }, 
                { projection: { password: 0 } }
            );
        // TODO: create index on username
            
        user.posts = await db.collection("posts")
            .find({ _id: { $in: user.post_ids } })
            .project({ title: 1 })
            .toArray();

        res.status(200).json(user);
    } catch(error) {
        console.log(error);
        res.status(500).json({error: 500, message: "oops"});
    } finally {
        await client.close();
    }
}