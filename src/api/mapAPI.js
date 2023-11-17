import axios from 'axios';




export const getAllMaps = async () => {
    try {
        const response = await axios.get(`https://vila-belga-backend-9c5dfe0034fe.herokuapp.com/maps`);
        return response
    } catch (error) {
        console.error(error);
    }
}

export const getMap = async (mapId) => {
    try {
        const response = await axios.get(`https://vila-belga-backend-9c5dfe0034fe.herokuapp.com/map/${mapId}`);
        return response
    } catch (error) {
        console.error(error);
    }
}

export const addMap = async (name,xMapSize, yMapSize, mapImagebase64) => {
    try {
        const response = await axios.post(`https://vila-belga-backend-9c5dfe0034fe.herokuapp.com/map`, {name, mapText: "", mapImageUrl: "", xMapSize, yMapSize, mapImagebase64: mapImagebase64});
        return response
    } catch (error) {
        console.error(error);
    }
}


export const deleteMap = async (mapId) => {
    try {
        const response = await axios.delete(`https://vila-belga-backend-9c5dfe0034fe.herokuapp.com/map/${mapId}`);
        return response
    } catch (error) {
        console.error(error);
    }
}