import request from "./request";

// Get a random question from the API DB
export default async function getQ({ category, difficulty }, amount = 50) {
    const query = [
        `api.php?amount=${amount}`,
        `category=${category}`,
        `difficulty=${difficulty !== "ultimate" ? difficulty : ""}`
    ];
    const response = await request(query.join("&"));

    return response.results;
}
