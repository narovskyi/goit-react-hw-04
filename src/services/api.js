import axios from 'axios';

const fetchPhoto = async (page, searchPhrase) => {
    const response = await axios.get('https://api.unsplash.com/search/photos/', {
        params: {
            query: `${searchPhrase}`,
            page: `${page}`,
            client_id: 'qrzSKGg7FhxPG0kzUyAPARbC7IcfPkocM9vE1RVKSAQ',
            orientation: 'landscape',
            per_page: 12
        }
    })
    return response.data.results;
}

const api = {
    fetchPhoto,
}

export default api;