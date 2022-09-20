import "./App.css";
import { useEffect, useState, useContext } from "react";
import { HistoryContext } from "./contexts/History"
import getIpData from "./api/communicator";
import axios from "axios";

import { FormHelperText, IconButton, OutlinedInput, InputLabel, InputAdornment } from "@mui/material";
import TextField from "@mui/material/FormControl";
import Search from "@mui/icons-material/Search";

import LeafletMap, { FlyToLocation, PanToLocation } from "./components/Map";

import InfoBox from "./components/InfoBox";
import HistoryList from "./components/History/HistoryList";



function App() {
  const [search, setSearch] = useState("");
  const [clientIP, setClientIP] = useState("");
  const [err,setErr] = useState("");
  const {
    history,setHistory,
    currentSelection,setCurrentSelection
  } = useContext(HistoryContext);


  const handleSearchInput = (ev)=>{
    setSearch(ev.target.value);
  }

  const handleSearch = ()=> {
    getIpData(search).then((response) => {
      // error display
      if (response.status === 'Error'){
        return setErr(response.msg);
      }
      setErr("");
      //---

      const coordinates = [response.data.latitude || 0,response.data.longitude|| 0];

      const newHistory = history;
      const newEntry = { ip:search, coords: coordinates, data: response.data };
      newHistory.unshift(newEntry);
      setHistory(newHistory);

      setCurrentSelection(newEntry);  
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      return handleSearch(e);
    }
  }


  
  // Initial client IP fetch
  useEffect( () => {
    axios.get('https://geolocation-db.com/json/').then(res=>{
      setClientIP(res.data.IPv4);
      setSearch(res.data.IPv4);
    });
    
  }, []);

  // Execute a search on client IP fetch
  useEffect( () => {
    if (search.length) handleSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientIP])


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
                    value={search}
                    onKeyDown={handleKeyDown}
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
