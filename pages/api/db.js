import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

export default function getClient() {
    return client;
}

export async function findUser({ _id, username, email }) {
    let user = null;
    let query = [];

    if(_id)
        query.push({ _id: _id });
    
    if(username)
        query.push({ username: username });
    
    if(email)
        query.push({ email: email });

    if(query.length == 0)
        return null;

    try {
        await client.connect();

        const db = client.db("devgallery");
        user = await db.collection("users")
            .findOne({ $or: query });
    } catch(error) {
        console.log(error);
    } finally {
        await client.close();
    }

    return user;
}

export async function createUser({ _id, email, username }) {
    try {
        await client.connect();
    
        const newUser = {
            _id: _id,
            email: email,
            username: username,
            post_ids: [],
        };
    
        const db = client.db("devgallery");
        await db.collection("users").updateOne(
                { _id: _id },
                { $setOnInsert: newUser },
                { upsert: true }
            );
        
        await client.close();
        return newUser;
    } catch(error) {
        console.log(error);
        
        await client.close();
        return null;
    }
}