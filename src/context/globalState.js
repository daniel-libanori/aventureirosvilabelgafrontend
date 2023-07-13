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

    const getChapters = (bookId)=>{
        load()
        const bookIndex = globalState.books.map(e=>e.id).indexOf(parseInt(bookId))
        return globalState.books[bookIndex].chapters
    }

    const addNewBook = (bookName) => {
        globalState.books.push({
            id: globalState.books.length + 1,
            book_name: bookName,
            chapters:[ ]
        })
        save()
    }

    const addNewChapter = (bookId, mapId, chapterName) => {
        load()
        const bookIndex = globalState.books.map(e=>e.id).indexOf(parseInt(bookId))

        globalState.books[bookIndex].chapters.push({
            id: globalState.books[bookIndex].chapters.length + 1,
            chapter_name: chapterName,
            introduction: '',
            map_id: mapId,
            exploration_points: []
        })

        save()
    }
    
    const addChapterIntroduction = (bookId, chapterId, introductionText) => {
        load()
        const bookIndex = globalState.books.map(e=>e.id).indexOf(parseInt(bookId))
        const chapterIndex = globalState.books[bookIndex].chapters
                                .map(e=>e.id).indexOf(parseInt(chapterId))

        globalState.books[bookIndex].chapters[chapterIndex].introduction =  introductionText
        
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
            getChapters,
            addNewChapter,
            addChapterIntroduction,
            load
        }}>
            {children}
        </GlobalContext.Provider>
    )

}