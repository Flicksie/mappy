const express = require('express');
const cors = require('cors');
const axios = require('axios');
const _config = require('./config-private.json');

const app = express();
app.use(cors());


const {ipstack} = _config;
const BASE_URL = ipstack.base_url;
const ACCESS_KEY = ipstack.access_key;
const IP_VALIDATION_RGX = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;

app.get('/api/getipinfo/:ipv4', async (req,res,nex) => {

    const {ipv4} = req.params;

    if ( !ipv4.match(IP_VALIDATION_RGX) )
        return res.status(400).json({ status: "Error", msg: "Invalid IP address (must be ipv4)"});

    //const {status,data} = await axios.get( `${BASE_URL}/${ipv4}?access_key=${ACCESS_KEY}`);
    const status = 200;
    const data = ipstack.mockdata;
    
    if (status !== 200) 
        return res.status(504).json({ status: "Error", msg: `Received error ${status} from API`});
    
    return res.status(200).json({status:"OK", data});
});



app.listen(3001,()=> console.log("API listening on 3001...") );