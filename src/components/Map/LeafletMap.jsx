import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";

function ReturnMarker(c, text) {
	return c === null ? null : (
		<Marker position={c}>
			<Popup> {text || "Location"} </Popup>
		</Marker>
	);
}

export function FlyToLocation({ coords }) {
	const map = useMap();
	map.flyTo(coords, map.getZoom());

	return ReturnMarker(coords);
}
export function PanToLocation({ coords }) {
	const map = useMap();
	map.panTo(coords, map.getZoom());
	return coords === null ? null : (
		<Marker position={coords}>
			<Popup>Location</Popup>
		</Marker>
	);
}

export default function LeafletMap({coords,children}) {
	return (
		<>
			<MapContainer
				style={{ height: 450, width: 450 }}
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
		</>
	);
}
