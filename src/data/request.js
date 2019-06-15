import { sessionToken } from "./sessionToken";

// Promise to handle a request
export default async function request(query, useToken = true) {
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
