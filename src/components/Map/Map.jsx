import React, {
  useMemo,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
// import { getGeocode, getLatLng } from "use-places-autocomplete";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  Circle,
  MarkerClusterer,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Loader } from "../Loader/Loader";

export const Map = ({ place }) => {
  //   console.log("placezzz", place);
  //   const [lat, setLat] = useState(0);
  //   const [lng, setLng] = useState(0);
  const [directions, setDirections] = useState();
  const [showDistance, setShowDistance] = useState(false);

  useEffect(() => {
    navigator.geolocation.watchPosition(function (position) {
      //   setLat(position.coords.latitude);
      //   setLng(position.coords.longitude);
    });
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: ["places", "directions"],
  });

  //   const center = useMemo(() => ({ lat: lat, lng: lng }), []);
  const center = useMemo(() => ({ lat: 6.602068, lng: 3.3021204 }), []);
  const defaultMapOptions = {
    // mapId: "6f857442a6985366",
    // fullscreenControl: false,
  };

  const houses = useMemo(() => generateHouses(center), [center]);
  const options = useMemo(
    () => ({
      //   disableDefaultUI: true,
      //   clickable: false,
      panControl: true,
      panControlOptions: {
        position: place,
      },
      //   fullscreenControl: false,
    }),
    []
  );

  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  if (!isLoaded) {
    return <Loader />;
  }

  const fetchDirections = (house) => {
    if (!place) return;

    const service = new window.google.maps.DirectionsService();
    service.route(
      {
        origin: house,
        destination: place,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  return (
    <div className="parent">
      <GoogleMap
        zoom={13}
        // center={{ lat: lat, lng: lng }}
        center={center}
        mapContainerClassName="map-container"
        // options={defaultMapOptions}
        options={options}
        onLoad={onLoad}
      >
        <>
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: "#1976D2",
                  strokeWeight: 5,
                },
              }}
            />
          )}
          {place ? (
            <>
              <MarkerF
                position={place}
                // icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
              />

              <MarkerClusterer>
                {(clusterer) => {
                  return houses.map((house) => (
                    <MarkerF
                      key={house.lat}
                      position={house}
                      clusterer={clusterer}
                      onClick={() => fetchDirections(house)}
                    />
                  ));
                }}
              </MarkerClusterer>
              <Circle center={place} radius={3000} options={closeOptions} />
              <Circle center={place} radius={5000} options={middleOptions} />
              <Circle center={place} radius={7000} options={farOptions} />
            </>
          ) : (
            <MarkerF position={center} />
          )}
        </>
      </GoogleMap>
    </div>
  );
};

const defaultOptionss = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptionss,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptionss,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptionss,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

const generateHouses = (position) => {
  const _houses = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
};
