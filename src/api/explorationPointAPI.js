import axios from 'axios';


export const getChapterExplorationPoints = async (chapterId, getBy) => {
    try {
        const response = await axios.get(`http://localhost:3030/chapter/${chapterId}/explorationPoints/`, { params: { getby: getBy } });
        return response
    } catch (error) {
        console.error(error);
    }
}


export const createNewExplorationPoint = async (chapterId, 
    name, code, xPosition, yPosition, pointIntroductionText, 
    pointChallangeText, previousIds, nextsIds, type, successText,
    failText, diceAmout, diceMinValueToSuccess, diceAmoutToSuccess) => {
    try {
        const response = await axios.post(`http://localhost:3030/chapter/${chapterId}/explorationPoint`,
            {
                name, code, xPosition: parseInt(xPosition), yPosition: parseInt(yPosition), pointIntroductionText,
                pointChallangeText, previousExplorationPointsId: previousIds, nextExplorationPointsId: nextsIds,  type, successText,
                failText, diceAmout, diceMinValueToSuccess, diceAmoutToSuccess
            });
        return response
    } catch (error) {
        console.error(error);
    }
}

export const updateExplorationPoint = async (explorationPointId, 
    name, code, xPosition, yPosition, pointIntroductionText, 
    pointChallangeText, previousIds, nextsIds, type, successText,
    failText, diceAmout, diceMinValueToSuccess, diceAmoutToSuccess) => {
    try {
        const response = await axios.put(`http://localhost:3030/explorationPoint/${explorationPointId}`,
            {
                name, code, xPosition: parseInt(xPosition), yPosition: parseInt(yPosition), pointIntroductionText,
                pointChallangeText, previousExplorationPointsId: previousIds, nextExplorationPointsId: nextsIds, type, successText,
                failText, diceAmout, diceMinValueToSuccess, diceAmoutToSuccess
            });
        return response
    } catch (error) {
        console.error(error);
    }
}

export const deleteExplorationPoint = async (explorationPointId) => {
    try {
        const response = await axios.delete(`http://localhost:3030/explorationPoint/${explorationPointId}`);
        return response
    } catch (error) {
        console.error(error);
    }
}