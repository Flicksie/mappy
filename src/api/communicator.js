import Axios from "axios";
import config from "./config-private.json";

const {ipstack} = config;
const BASE_URL = ipstack.base_url;
const ACCESS_KEY = ipstack.access_key;
const IP_VALIDATION_RGX = new RegExp("^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$");


export default async function getIpData(ipv4){
    if ( !ipv4.match(IP_VALIDATION_RGX) ) return { status: "Error", msg: "Invalid IP address (must be ipv4)"};
    //const {status,data} = await Axios.get( `${BASE_URL}/${ipv4}?access_key=${ACCESS_KEY}`);
    const status = 200;
    const data = ipstack.mockdata;
    if (status !== 200) return { status: "Error", msg: `Received error ${status} from API`};
    console.log(data)
    return {status:"OK", data};    
}
