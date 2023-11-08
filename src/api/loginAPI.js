import axios from 'axios';




export const handleLoginReq = async (email) => {
    try {
        const response = await axios.get(`http://localhost:3030/user/${email}`);
        return response
    } catch (error) {
        console.error(error);
    }
}

export const handleSignUpReq = async (email) => {
    try {
        const response = await axios.post(`http://localhost:3030/user`,{email: email});
        return response
    } catch (error) {
        console.error(error);
    }
}