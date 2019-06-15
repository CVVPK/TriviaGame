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

// Returns available categories
export async function getCategories() {
    const query = "api_category.php";
    const response = await request(query, false);
    return response.trivia_categories;
}

// Promise to handle a request
async function request(query, useToken = true) {
    const token = useToken ? `&token=${await sessionToken}` : "";
    const url = "https://opentdb.com/";
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const endpoint = url + query + token;
        xhr.open("GET", endpoint);
        xhr.send();
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState === 4) {
                const response = JSON.parse(xhr.responseText);
                if (response.hasOwnProperty("response_code")) {
                    if (response.response_code === 0) {
                        resolve(response);
                    } else reject(response.response_code);
                } else if (response.hasOwnProperty("trivia_categories")) {
                    resolve(response);
                }
            }
        });
    });
}

// Get an api token to prevent duplicate questions
const sessionToken = (async function() {
    const query = "api_token.php?command=request";
    const response = await request(query, false);
    return response.token;
})();
