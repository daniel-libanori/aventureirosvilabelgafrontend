import axios from "axios";

//http://localhost:3030
//http://localhost:3030

export const getAllEnemies = async (userId) => {
  try {
    const response = await axios.get(
      `https://vila-belga-backend-9c5dfe0034fe.herokuapp.com/enemies`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const createEnemy = async (name) => {
  try {
    const response = await axios.post(
      `https://vila-belga-backend-9c5dfe0034fe.herokuapp.com/enemy`,
      {
        name: name,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deleteEnemy = async (enemyId) => {
  try {
    const response = await axios.delete(
      `https://vila-belga-backend-9c5dfe0034fe.herokuapp.com/enemy/${enemyId}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
