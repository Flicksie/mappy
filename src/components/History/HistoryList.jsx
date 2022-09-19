import { useContext } from "react"
import { HistoryContext } from "../../contexts/History"
import HistoryEntry from "./HistoryEntry";


export default function HistoryList(){

    const {history,setCurrentSelection} = useContext(HistoryContext);

    const handleClick = (e) => {
        setCurrentSelection(e);
    }

    return (
        <ul>
        {
            history.map((entry,i)=>{
                return <li key={i}><button onClick={ ()=>handleClick(entry) }>
                    <HistoryEntry {...{entry}} />
                </button></li>
            })
        }
        </ul>
    )
}