const API_BASE_URL = 'https://api.tvmaze.com';
export async function apiGet(queryString) {

    const response = fetch(`${API_BASE_URL}${queryString}`)
    .then(r => r.json()); //to recieve data from external source or any other source we need to call browser api (fetch)
    // return promise recieved in raw structure, convert it into json format
    return response;
}