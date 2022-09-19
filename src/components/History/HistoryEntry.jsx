export default function HistoryEntry({entry}){
    return <>
        <div className="flag-mini">
            <img alt="" src={entry?.data?.location.country_flag}></img>
        </div>
        <b>{entry?.data.country_code||"N/A"}</b>
        : {entry?.ip}
    </>
}