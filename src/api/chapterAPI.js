import axios from 'axios';


export const getBooksChapter = async (bookId) => {
    try {
        const response = await axios.get(`http://localhost:3030/book/${bookId}/chapters`);
        return response
    } catch (error) {
        console.error(error);
    }
}

export const getChapter = async (chapterId) => {
    try {
        const response = await axios.get(`http://localhost:3030/chapter/${chapterId}`);
        return response
    } catch (error) {
        console.error(error);
    }
}

export const updateChapter = async (chapterId, name, introduction, bookId, mapId) => {
    try {
        const response = await axios.put(`http://localhost:3030/chapter/${chapterId}`, 
        { name, introduction, bookId, mapId });
        return response
    } catch (error) {
        console.error(error);
    }
}

export const createNewChapter = async (bookId, name, mapId  ) => {
    try {
        const response = await axios.post(`http://localhost:3030/book/${bookId}/chapter`, {name: name, introduction: '', mapId: mapId });
        return response
    } catch (error) {
        console.error(error);
    }
}