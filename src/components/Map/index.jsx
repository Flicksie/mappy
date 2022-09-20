import { useEffect } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

function ReturnMarker(c, text) {
	return c === null ? null : (
		<Marker position={c}>
			<Popup> {text || "Location"} </Popup>
		</Marker>
	);
}
export function MapLocator(){
	const map = useMap();
  
	useEffect(()=>{      
	  map.locate({setView: true, watch: true, maxZoom: 17});
	  map.once('locationfound', (ev) => {
		map.flyTo(ev.latlng, map.getZoom());
		return ReturnMarker(ev.latlng);
	  });
	}); 
	
}

export function FlyToLocation({ coords, title }) {
	const map = useMap();
	map.flyTo(coords, map.getZoom());
	return ReturnMarker(coords, title);
}
export function PanToLocation({ coords, title }) {
	const map = useMap();
	map.panTo(coords, map.getZoom());
	return ReturnMarker(coords, title);
}

export default function LeafletMap({coords,children}) {

	return (
		<div className="leaflet-map">
			<MapContainer
				style={{ height: 400, width: 600 }}
				center={[0, 0]}
				zoom={8}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{children}
			</MapContainer>
		</div>
	);
}
