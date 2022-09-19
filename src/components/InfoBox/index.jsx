
import { Box } from "@mui/system";

export default function InfoBox({current}){
    return(
        <div className="info-box">
          { current?.ip ?
            <>
                <div className="title-card">
                    <div className="country-flag">
                        <img alt="Flag" src={current.location.country_flag } />
                    </div>
                    <div className="titles">
                        <h1>{current.city}</h1>
                        <h2>{current.country_name}</h2>
                    </div>
                </div>


            </>
            : null
          }
        </div>
    )
}