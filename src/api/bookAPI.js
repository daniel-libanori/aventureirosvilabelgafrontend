import axios from 'axios';

export const getBook = async (bookId) => {
    try {
        const response = await axios.get(`http://localhost:3030/book/${bookId}`);
        return response
    } catch (error) {
        console.error(error);
    }
}


export const getMyBooks = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:3030/user/${userId}/books`);
        return response
    } catch (error) {
        console.error(error);
    }
}

export const createNewBook = async (userId, name) => {
    try {
        const response = await axios.post(`http://localhost:3030/user/${userId}/book`, {name: name});
        return response
    } catch (error) {
        console.error(error);
    }
}

export const updateBook = async (bookId, name) => {
    try {
        const response = await axios.put(`http://localhost:3030/book/${bookId}`, {name: name});
        return response
    } catch (error) {
        console.error(error);
    }
}

export const deleteBook = async (bookId) => {
    try {
        const response = await axios.delete(`http://localhost:3030/book/${bookId}`);
        return response
    } catch (error) {
        console.error(error);
    }
}