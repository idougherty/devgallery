import posts from "pages/api/temp_data/examplePosts";

export default function handler(req, res) {
    const { id } = req.query; 
    const post = posts.find(post => post.id == id);

    if(post)
        res.status(200).json(post);
    else
        res.status(400).json({error:400, details:"no post"});
}