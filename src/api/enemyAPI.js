import axios from "axios";

//https://vila-belga-backend-9c5dfe0034fe.herokuapp.com/
//http://localhost:3030

export const getAllEnemies = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3030/enemies`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const createEnemy = async (name) => {
  try {
    const response = await axios.post(`http://localhost:3030/enemy`, {
      name: name,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteEnemy = async (enemyId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3030/enemy/${enemyId}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
