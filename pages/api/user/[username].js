import getClient from "pages/api/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const { username } = req.query; 
    const user = getUser(username);

    console.log(user);

    if(!user.error)
        res.status(200).json(user);
    else
        res.status(500).json(user);
}

export async function getUser(username) {
    let res;
    const client = getClient();

    try {
        await client.connect();
        const db = client.db("devgallery");
        
        const user = await db.collection("users")
            .findOne({ username: username });
        // TODO: create index on username
            
        user.posts = await db.collection("posts")
            .find({ _id: { $in: user.post_ids } })
            .project({ title: 1 })
            .toArray();

        res = user;
    } catch(error) {
        console.log(error);
        res = { error: 500, message: "oops" };
    } finally {
        await client.close();
    }

    return JSON.parse(JSON.stringify(res));
}