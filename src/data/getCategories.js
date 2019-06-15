import request from "./request";

// Returns available categories
export default async function getCategories() {
    const query = "api_category.php";
    const response = await request(query, false);
    return response.trivia_categories;
}
