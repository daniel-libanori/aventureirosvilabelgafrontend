import axios from 'axios';

export const getPdf = async (bookId) => {
    try {
        const response = await axios.get(`http://localhost:3030/book/${bookId}/pdf`, { responseType: 'blob' });
        return response
    } catch (error) {
        console.error(error);
    }
}
