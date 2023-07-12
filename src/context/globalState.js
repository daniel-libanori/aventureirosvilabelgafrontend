import { createContext, useState } from "react";


const initialState = {
    books: [
        {
            id: 1,
            book_name: 'example',
            chapters:[
                {
                    id: 1,
                    chapter_name: 'Chapter 1',
                    introduction: '',
                    map_id: 1,
                    exploration_points: [
                        {
                            x: 1,
                            y: 1,
                            name: 'First Exploration Point'
                        }
                    ]
                }
            ]


        }
    ]

}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = ({children}) => {

    const [globalState, setGlobalState] = useState(initialState)

    const getBooks = ()=>{
        return globalState.books
    }

    const addNewBook = (bookName) => {
        globalState.books.push({
            id: globalState.books.length,
            book_name: bookName,
            chapters:[ ]
        })
        save()
    }

    const save = ()=>{
        localStorage.setItem("AventureirosVilaBelga", JSON.stringify(globalState))
    }

    const load = () => {
        const localStorageLoad = localStorage.getItem("AventureirosVilaBelga")
        if(!!localStorageLoad){
            setGlobalState(JSON.parse(localStorageLoad))    
        }
    }

    return(
        <GlobalContext.Provider value={{
            addNewBook,
            getBooks,
            load
        }}>
            {children}
        </GlobalContext.Provider>
    )

}