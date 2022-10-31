import getClient from "pages/api/db";

export default async function handler(req, res) {
    const client = getClient();

    try {
        await client.connect();

        const users = await client.db("devgallery")
            .collection("users").find()
            .project({ password: 0 }).toArray();

        res.status(200).json(users);
    } catch(error) {
        console.log(error);
        res.status(500).json({error: 500, message: "oops"});
    } finally {
        await client.close();
    }
}