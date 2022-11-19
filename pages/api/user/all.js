import getClient from "pages/api/db";

export default async function handler(req, res) {
    const users = getAllUsers();

    if(!users.error)
        res.status(200).json(users);
    else
        res.status(500).json(users);

}

export async function getAllUsers() {
    let res;
    const client = getClient();

    try {
        await client.connect();

        res = await client.db("devgallery")
            .collection("users").find().toArray();

    } catch(error) {
        console.log(error);
        res = { error: 500, message: "oops" };
    } finally {
        await client.close();
    }

    return JSON.parse(JSON.stringify(res));
}