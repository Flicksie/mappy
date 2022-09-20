import Axios from "axios";

//const INTERNAL_API_URL = "http://localhost:3001/api";
const INTERNAL_API_URL = "/api";

const IP_VALIDATION_RGX = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;

export default async function getIpData(ipv4){
    if ( !ipv4.match(IP_VALIDATION_RGX) ) return { status: "Error", msg: "Invalid IP address (must be ipv4)"};
    const {data} = await Axios.get( `${INTERNAL_API_URL}/getipinfo/${ipv4}`);
    return data; 
}
