// Get a random question from the API DB
export default async function getQ({ category, difficulty }) {
    const query = [
        "api.php?amount=10",
        `category=${category}`,
        `difficulty=${difficulty}`
    ];
    const response = await request(query.join("&"));
    return response.results;
}

async function request(query, useToken = true) {
    const token = useToken ? await sessionToken : "";
    const url = "https://opentdb.com/";
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        const endpoint = url + query + `&token=${token}`;
        xhr.open("GET", endpoint);
        xhr.send();
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState === 4) {
                const response = JSON.parse(xhr.responseText);
                if (response.response_code === 0) {
                    resolve(response);
                }
            }
        });
    });
}

// Get an api token
const sessionToken = (async function() {
    const query = "api_token.php?command=request";
    const response = await request(query, false);
    return response.token;
})();
