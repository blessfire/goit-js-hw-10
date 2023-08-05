const API_URL = 'https://api.thecatapi.com/v1';

import axios from "axios";
axios.defaults.headers.common['x-api-key'] = 'live_jtm8gwip36xcN7yYdoSeJ51IdEDqcFvAiqeounFUVaQyjCP3PutEzNpb5t5PkIrd';

export function fetchBreeds() {
    return axios.get(`${API_URL}/breeds`).then(response => {
        if (response.status !== 200) {
            throw new Error(errorMsg);
        }
        return response.data;
    })
}

export function fetchCatByBreed(breedId) {
    return axios.get(`${API_URL}/images/search?breed_ids=${breedId}`).then(response => {
        if (response.status !== 200) {
            throw new Error(errorMsg);
        }
        return response.data;
})
}