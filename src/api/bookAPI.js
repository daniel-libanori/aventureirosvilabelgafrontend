import axios from 'axios';

export const getBook = async (bookId) => {
    try {
        const response = await axios.get(`https://vila-belga-backend-9c5dfe0034fe.herokuapp.com/book/${bookId}`);
        return response
    } catch (error) {
        console.error(error);
    }
}


export const getMyBooks = async (userId) => {
    try {
        const response = await axios.get(`https://vila-belga-backend-9c5dfe0034fe.herokuapp.com/user/${userId}/books`);
        return response
    } catch (error) {
        console.error(error);
    }
}

export const createNewBook = async (userId, name) => {
    try {
        const response = await axios.post(`https://vila-belga-backend-9c5dfe0034fe.herokuapp.com/user/${userId}/book`, {name: name});
        return response
    } catch (error) {
        console.error(error);
    }
}

export const updateBook = async (bookId, name) => {
    try {
        const response = await axios.put(`https://vila-belga-backend-9c5dfe0034fe.herokuapp.com/book/${bookId}`, {name: name});
        return response
    } catch (error) {
        console.error(error);
    }
}

export const deleteBook = async (bookId) => {
    try {
        const response = await axios.delete(`https://vila-belga-backend-9c5dfe0034fe.herokuapp.com/book/${bookId}`);
        return response
    } catch (error) {
        console.error(error);
    }
}