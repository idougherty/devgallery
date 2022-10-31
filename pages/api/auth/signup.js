import getClient from "pages/api/db";
import { hash } from "bcryptjs"; 
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    if(req.method != "POST")
        return res.status(400).json({ error: 400, message: "Invalid request type." });

    const { username, email, password } = req.body;

    if(!username || !email || !password)
        return res.status(422).json({ error: 422, message: "Invalid data." });

    const client = getClient();
    try {
        await client.connect();
        const db = client.db("devgallery");

        const checkUser = await db.collection("users")
            .findOne({ $or: [ { email: email }, { username: username } ] });
        
        if(checkUser && checkUser.email == email)
            throw { ok: false, status: 422, message: "Email already in use."}
            
        if(checkUser && checkUser.username == username)
            throw { ok: false, status: 422, message: "Username already in use."}

        const userId = new ObjectId();
        await db.collection("users")
            .insertOne({
                _id: userId,
                email: email,
                username: username,
                password: await hash(password, 12),
                post_ids: [],
            });

        res.status(201).json({ ok: true, status: 201, message: "User created" });
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