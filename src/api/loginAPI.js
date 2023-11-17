import axios from 'axios';




export const handleLoginReq = async (email) => {
    try {
        const response = await axios.get(`https://vila-belga-backend-9c5dfe0034fe.herokuapp.com/user/${email}`);
        return response
    } catch (error) {
        console.error(error);
    }
}

export const handleSignUpReq = async (email) => {
    try {
        const response = await axios.post(`https://vila-belga-backend-9c5dfe0034fe.herokuapp.com/user`,{email: email});
        return response
    } catch (error) {
        console.error(error);
    }
}