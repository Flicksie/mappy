import "./App.css";
import { useEffect, useState, useRef } from "react";
import getIpData from "./api/communicator";





import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/FormControl";
import Search from "@mui/icons-material/Search";
import { FormHelperText } from "@mui/material";
import { useContext } from "react";
import { HistoryContext } from "./contexts/History"
import HistoryContextProvider from './contexts/History';
import LeafletMap, { FlyToLocation, PanToLocation } from "./components/Map";
import InfoBox from "./components/InfoBox";

import {Grid,Item} from '@mui/material';
import { Container } from "@mui/system";
import HistoryList from "./components/History/HistoryList";




function App() {
  const [search, setSearch] = useState("");
  const [err,setErr] = useState("");
  const {
    history,setHistory,
    currentSelection,setCurrentSelection
  } = useContext(HistoryContext);
  

  const handleSearchInput = (ev)=>{
    setSearch(ev.target.value);
  }

  const handleSearch = (ev)=>{
    getIpData(search).then((response) => {
      if (response.status === 'Error'){
        return setErr(response.msg);
      }
      setErr("");

      const coordinates = [response.data.latitude || 0,response.data.longitude|| 0];

      const newHistory = history;
      const newEntry = { ip:search, coords: coordinates, data: response.data };
      newHistory.unshift(newEntry);
      setHistory(newHistory);

      setCurrentSelection(newEntry);  
    })
  }


  return (
    <div className="app-container">
      <div className="sidebar">        
          <HistoryList></HistoryList>        
      </div>


        <div className="map-area">
          <div className="map-and-info current">
            <LeafletMap>
              <FlyToLocation coords={ currentSelection?.coords || [1, 1]} />
            </LeafletMap>
            <InfoBox current={currentSelection.data} />
          </div>
          
          <div className="searchbar">          
       
                <TextField sx={{ m: 1, width: "100%" }} variant="outlined"  >
                  <InputLabel htmlFor="outlined-adornment">
                    IP Address
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-helper-text"
                    type="text"
                    error={!!err.length}
                    
                    placeholder="192.168.1.128"
                    onChange= {handleSearchInput}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={handleSearch} edge="end" >
                          <Search />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                <FormHelperText error={!!err.length} >{err}</FormHelperText>
                </TextField>
          
          </div>

          <div className="map-and-info last">
            <LeafletMap>
              <PanToLocation coords={history[1]?.coords || [1, 1]} />
            </LeafletMap>
            <InfoBox current={history[1]?.data} />
          </div>
        </div>

        


      
      
      

    </div>
      
  );
}

export default App;
