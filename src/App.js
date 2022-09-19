import "./App.css";
import { useEffect, useState, useRef } from "react";
import getIpData from "./api/communicator";

import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'



import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/FormControl";
import Search from "@mui/icons-material/Search";
import { FormHelperText } from "@mui/material";





function LocationMarker({coords}) {
  const map = useMap();
  map.flyTo(coords, map.getZoom())
  return coords === null ? null : (
    <Marker position={coords}>
      <Popup>Estimated Location</Popup>
    </Marker>
  )
}
function LocationMarkerTeleport({coords}) {
  const map = useMap();
  map.flyTo(coords, map.getZoom())
  return coords === null ? null : (
    <Marker position={coords}>
      <Popup>Location</Popup>
    </Marker>
  )
}

function App() {
  const [current, setCurrent] = useState(null);
  const [search, setSearch] = useState("");
  const [coords,setCoords] = useState([0,0]);
  const [err,setErr] = useState("");
  const [history,setHistory] = useState([]);

  const handleSearchInput = (ev)=>{
    setSearch(ev.target.value);
  }

  const handleSearch = (ev)=>{
    getIpData(search).then((response) => {
      if (response.status === 'Error'){
        return setErr(response.msg);
      }
      setErr("");

      const coordinates = [response.data.latitude,response.data.longitude];

      const newHistory = history;
      newHistory.unshift({ ip:search, coords: coordinates, data: response.data });
      setHistory(newHistory);
      setCurrent(response.data);
      setCoords(coordinates);      
    })
  }


  return (
    <div>
      <Box>
        <TextField sx={{ m: 1, width: "25ch" }} variant="outlined"  >
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
      </Box>
      
      <MapContainer style={{height:450,width:450}} center={coords} zoom={8} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coords}>
          <Popup>
            Hello
          </Popup>
        </Marker>
        <LocationMarker {...{coords}}/>
        
      </MapContainer>

      <MapContainer style={{height:450,width:450}} center={[0,0]} zoom={8} scrollWheelZoom={false}>
      <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarkerTeleport coords={history[1]?.coords||[1,1]} />
      </MapContainer>

      <ul>
        {
          history.map((entry,i)=>{
            return <li key={i}>{entry.ip}</li>
          })
        }
      </ul>

      <Box>
        { current?
          <>
            <h1>{current.city}</h1>
            <h2>{current.country_name}</h2>
            <img alt="Flag" src={current.location.country_flag } />

          </>
          :null
        }
      </Box>

    </div>
  );
}

export default App;
