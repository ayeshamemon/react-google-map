import React, { useState } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import { markers } from "./data";
const mapStyles = {
  width: "100%",
  height: "100%",
};

export const App = (props) => {
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});

  const onMarkerClick = (props, marker, e) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowingInfoWindow(true);
  };

  const onClose = (props) => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
    }
  };

  console.log(props.google);
  return (
    <Map
      google={props.google}
      zoom={14}
      style={mapStyles}
      // initialCenter={{
      //   lat: -1.2884,
      //   lng: 36.8233,
      // }}
    >
      {markers.map((marker, key) => {
        console.log(marker);
        return (
          <Marker
            icon={{
              url: marker.icon,
            }}
            onClick={onMarkerClick}
            name={marker.name}
            description={marker.description}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        );
      })}
      {/*
        <Marker
          onClick={this.onMarkerClick}
          name={"Kenyatta International Convention Centre"}
          description="ABCSSSS"
          position={{ lat: 37.778519, lng: -122.40564 }}
        />*/}
      <InfoWindow
        marker={activeMarker}
        visible={showingInfoWindow}
        onClose={onClose}
      >
        <div>
          <h4 style={{ textAlign: "center" }}>{selectedPlace.name}</h4>
          <p style={{ textAlign: "center", fontWeight: "bold" }}>
            {selectedPlace.description}
          </p>
        </div>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "api key here",
})(App);
