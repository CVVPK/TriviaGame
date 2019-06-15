import request from "./request";

// Get an api token to prevent duplicate questions
export const sessionToken = (async function() {
    const query = "api_token.php?command=request";
    const response = await request(query, false);
    return response.token;
})();
