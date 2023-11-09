import axios from 'axios';


export const getBooksChapter = async (bookId) => {
    try {
        const response = await axios.get(`http://localhost:3030/book/${bookId}/chapters`);
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