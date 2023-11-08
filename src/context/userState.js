import { createContext, useState } from "react";

const initialState = { }

export const GlobalUserContext = createContext(initialState)

export const GlobalUserProvider = ({children}) => {

    const [globalUser, setUser] = useState(initialState)


    const setGlobalUser = (usr) =>{
        setUser(usr)
        localStorage.setItem(`AVBUser`, JSON.stringify(usr))
    }

    const getGlobalUser = () =>{
        const localStorageLoad = localStorage.getItem("AVBUser")
        if(!!localStorageLoad){
            setUser(JSON.parse(localStorageLoad))    
            return JSON.parse(localStorageLoad)
        }
        return {}
    }

    return(
        <GlobalUserContext.Provider value={{
            setGlobalUser,
            getGlobalUser
        }}>
            {children}
        </GlobalUserContext.Provider>
    )

}