import axios from 'axios';


export const getBooksChapter = async (bookId) => {
    try {
        const response = await axios.get(`https://vila-belga-backend-9c5dfe0034fe.herokuapp.com/book/${bookId}/chapters`);
        return response
    } catch (error) {
        console.error(error);
    }
}

export const getChapter = async (chapterId) => {
    try {
        const response = await axios.get(`https://vila-belga-backend-9c5dfe0034fe.herokuapp.com/chapter/${chapterId}`);
        return response
    } catch (error) {
        console.error(error);
    }
}

export const updateChapter = async (chapterId, name, introduction, bookId, mapId) => {
    try {
        const response = await axios.put(`https://vila-belga-backend-9c5dfe0034fe.herokuapp.com/chapter/${chapterId}`, 
        { name, introduction, bookId, mapId });
        return response
    } catch (error) {
        console.error(error);
    }
}

export const createNewChapter = async (bookId, name, mapId  ) => {
    try {
        const response = await axios.post(`https://vila-belga-backend-9c5dfe0034fe.herokuapp.com/book/${bookId}/chapter`, {name: name, introduction: '', mapId: mapId });
        return response
    } catch (error) {
        console.error(error);
    }
}

export const deleteChapter = async (chapterId) => {
    try {
        const response = await axios.delete(`https://vila-belga-backend-9c5dfe0034fe.herokuapp.com/chapter/${chapterId}`);
        return response
    } catch (error) {
        console.error(error);
    }
}