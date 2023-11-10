import axios from 'axios';


export const getChapterExplorationPoints = async (chapterId, getBy) => {
    try {
        const response = await axios.get(`http://localhost:3030/chapter/${chapterId}/explorationPoints/`, { params: { getby: getBy } });
        return response
    } catch (error) {
        console.error(error);
    }
}


export const createNewExplorationPoint = async (chapterId, name, code, xPosition, yPosition, pointIntroductionText, pointChallangeText, previousIds, nextsIds) => {
    try {
        const response = await axios.post(`http://localhost:3030/chapter/${chapterId}/explorationPoint`,
            {
                name, code, xPosition: parseInt(xPosition), yPosition: parseInt(yPosition), pointIntroductionText,
                pointChallangeText, previousExplorationPointsId: previousIds, nextExplorationPointsId: nextsIds
            });
        return response
    } catch (error) {
        console.error(error);
    }
}