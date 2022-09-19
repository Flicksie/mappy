import { createContext, useState } from "react";


export const HistoryContext = createContext({
    history: [],
    setHistory: ()=>{},
    currentSelection: {ip:"",coords:[0,0],data:{}},
    setCurrentSelection: ()=>{},
});

export function historyPileAdd(entry,history){
    const newHistory = history;
    newHistory.unshift(entry);
    //newHistory.unshift({ ip:search, coords: coordinates, data: response.data });
    return newHistory;
}

export default function HistoryContextProvider({children}){
    
    const [history,setHistory] = useState([]);
    const [currentSelection,setCurrentSelection] = useState({ip:"",coords:[0,0],data:{}});
    

    return (
        <HistoryContext.Provider value={
            {
            // getters
                history,
                currentSelection,
            // setters
                setHistory,
                setCurrentSelection
            }

        }>
            {children}
        </HistoryContext.Provider>
    )
}