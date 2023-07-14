import { createContext, useState } from "react";
import { returnMissingNumberOrNext} from '../utils/arrFunctions'

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
                    exploration_points: 
                        [
                            [{x:0, y:0, points:[]},{x:0, y:1, points:[]},{x:0, y:2, points:[]},{x:0, y:3, points:[]},{x:0, y:4, points:[]}],
                            [{x:1, y:0, points:[]},{x:1, y:1, points:[]},{x:1, y:2, points:[]},{x:1, y:3, points:[]},{x:1, y:4, points:[]}],
                            [{x:2, y:0, points:[]},{x:2, y:1, points:[]},{x:2, y:2, points:[]},{x:2, y:3, points:[]},{x:2, y:4, points:[]}],
                            [{x:3, y:0, points:[]},{x:3, y:1, points:[]},{x:3, y:2, points:[]},{x:3, y:3, points:[]},{x:3, y:4, points:[]}],
                            [{x:4, y:0, points:[]},{x:4, y:1, points:[]},{x:4, y:2, points:[]},{x:4, y:3, points:[{id:1,name:'test exp point', text:"", unlock:[{id:2,x:4,y:3}]},{id:2,name:'test exp point2', text:"", unlock:[]}]},{x:4, y:4, points:[]}],
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

    const getExplorationPoints = (bookId, chapterId)=>{
        load()
        const bookIndex = globalState.books.map(e=>e.id).indexOf(parseInt(bookId))
        const chapterIndex = globalState.books[bookIndex].chapters.map(e=>e.id).indexOf(parseInt(chapterId))

        return globalState.books[bookIndex]?.chapters[chapterIndex]?.exploration_points
    }

    const getExplorationPointsArray = (bookId, chapterId)=>{
        load()
        const bookIndex = globalState.books.map(e=>e.id).indexOf(parseInt(bookId))
        const chapterIndex = globalState.books[bookIndex].chapters.map(e=>e.id).indexOf(parseInt(chapterId))

        const expPointsArray = []

        globalState.books[bookIndex]?.chapters[chapterIndex]?.exploration_points.map(row=>row.map(item=>{
            if(item.points.length>0){
                item.points.map(point=>{
                    expPointsArray.push({...point, x: item.x, y: item.y})
                })

            }

        }))
        
        return expPointsArray
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
            exploration_points: [
                [{x:0, y:0, points:[]},{x:0, y:1, points:[]},{x:0, y:2, points:[]},{x:0, y:3, points:[]},{x:0, y:4, points:[]}],
                [{x:1, y:0, points:[]},{x:1, y:1, points:[]},{x:1, y:2, points:[]},{x:1, y:3, points:[]},{x:1, y:4, points:[]}],
                [{x:2, y:0, points:[]},{x:2, y:1, points:[]},{x:2, y:2, points:[]},{x:2, y:3, points:[]},{x:2, y:4, points:[]}],
                [{x:3, y:0, points:[]},{x:3, y:1, points:[]},{x:3, y:2, points:[]},{x:3, y:3, points:[]},{x:3, y:4, points:[]}],
                [{x:4, y:0, points:[]},{x:4, y:1, points:[]},{x:4, y:2, points:[]},{x:4, y:3, points:[]},{x:4, y:4, points:[]}],
            ]
        })

        save()
        return({
            id: globalState.books[bookIndex].chapters.length,
            chapter_name: chapterName,
            introduction: '',
            map_id: mapId,
            exploration_points: [
                [{x:0, y:0, points:[]},{x:0, y:1, points:[]},{x:0, y:2, points:[]},{x:0, y:3, points:[]},{x:0, y:4, points:[]}],
                [{x:1, y:0, points:[]},{x:1, y:1, points:[]},{x:1, y:2, points:[]},{x:1, y:3, points:[]},{x:1, y:4, points:[]}],
                [{x:2, y:0, points:[]},{x:2, y:1, points:[]},{x:2, y:2, points:[]},{x:2, y:3, points:[]},{x:2, y:4, points:[]}],
                [{x:3, y:0, points:[]},{x:3, y:1, points:[]},{x:3, y:2, points:[]},{x:3, y:3, points:[]},{x:3, y:4, points:[]}],
                [{x:4, y:0, points:[]},{x:4, y:1, points:[]},{x:4, y:2, points:[]},{x:4, y:3, points:[]},{x:4, y:4, points:[]}],
            ]
        })
    }
    
    const addChapterIntroduction = (bookId, chapterId, introductionText) => {
        load()
        const bookIndex = globalState.books.map(e=>e.id).indexOf(parseInt(bookId))
        const chapterIndex = globalState.books[bookIndex].chapters
                                .map(e=>e.id).indexOf(parseInt(chapterId))

        globalState.books[bookIndex].chapters[chapterIndex].introduction =  introductionText
        
        save()
    }

    const addNewExplorationPoint = (bookId, chapterId, x, y, name, text, unlock) => {
        load()
        const bookIndex = globalState.books.map(e=>e.id).indexOf(parseInt(bookId))
        const chapterIndex = globalState.books[bookIndex].chapters
                                .map(e=>e.id).indexOf(parseInt(chapterId))

        globalState.books[bookIndex].chapters[chapterIndex].exploration_points[x][y].points.push({
            id:returnMissingNumberOrNext(globalState.books[bookIndex].chapters[chapterIndex].exploration_points[x][y].points.map(e=>e.id)),
            name: name,
            text: text,
            unlock:[ ...unlock.map(p=>({id:p.id, x:p.x, y:p.y}))]
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
            getChapters,
            addNewChapter,
            addChapterIntroduction,
            getExplorationPoints,
            load,
            addNewExplorationPoint,
            getExplorationPointsArray,
            globalState
        }}>
            {children}
        </GlobalContext.Provider>
    )

}