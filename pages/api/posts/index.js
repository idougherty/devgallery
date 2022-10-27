import posts from "pages/api/temp_data/examplePosts";

export default function handler(req, res) {
    res.status(200).json(posts);
}