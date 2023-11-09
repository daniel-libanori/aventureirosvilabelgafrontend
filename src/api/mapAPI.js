import axios from 'axios';




export const getAllMaps = async () => {
    try {
        const response = await axios.get(`http://localhost:3030/maps`);
        return response
    } catch (error) {
        console.error(error);
    }
}

export const addMap = async (name,xMapSize, yMapSize, mapImagebase64) => {
    try {
        const response = await axios.post(`http://localhost:3030/map`, {name, mapText: "", mapImageUrl: "", xMapSize, yMapSize, mapImagebase64});
        return response
    } catch (error) {
        console.error(error);
    }
}