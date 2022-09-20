import Axios from "axios";

const demo_data = {
    "ip": "31.11.131.195",
    "type": "ipv4",
    "continent_code": "EU",
    "continent_name": "Europe",
    "country_code": "PL",
    "country_name": "Poland",
    "region_code": "ZP",
    "region_name": "West Pomerania",
    "city": "Stargard",
    "zip": "73-107",
    "latitude": 53.3338508605957,
    "longitude": 15.009209632873535,
    "location": {
      "geoname_id": 3084840,
      "capital": "Warsaw",
      "languages": [{ "code": "pl", "name": "Polish", "native": "Polski" }],
      "country_flag": "https://assets.ipstack.com/flags/pl.svg",
      "country_flag_emoji": "\ud83c\uddf5\ud83c\uddf1",
      "country_flag_emoji_unicode": "U+1F1F5 U+1F1F1",
      "calling_code": "48",
      "is_eu": true
    }
}

const IP_VALIDATION_RGX = /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;

export default async function getIpData(ipv4){
    if ( !ipv4.match(IP_VALIDATION_RGX) ) return { status: "Error", msg: "Invalid IP address (must be ipv4)"};
    const {data} = await Axios.get( `/api/getipinfo/${ipv4}`).catch(err=>({data:{ status: "Fallback", data:demo_data}}));
    return data; 
}
