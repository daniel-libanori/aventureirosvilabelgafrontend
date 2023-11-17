import axios from 'axios';

export const getPdf = async (bookId) => {
    try {
        const response = await axios.get(`https://vila-belga-backend-9c5dfe0034fe.herokuapp.com/book/${bookId}/pdf`, { responseType: 'blob' });
        return response
    } catch (error) {
        console.error(error);
    }
}
