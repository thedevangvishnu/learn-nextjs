"use client";

import { useState } from "react";

type PositionType = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

const useTrackLocation = () => {
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const [longLat, setLongLat] = useState("");
  const [locationErrorMessage, setLocationErrorMessage] = useState("");

  function success(position: PositionType) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLongLat(`${longitude},${latitude}`);
    setLocationErrorMessage("");
    setIsFindingLocation(false);
    console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
  }

  function error() {
    setLocationErrorMessage("Unable to retrieve your location");
    setIsFindingLocation(false);
    console.log("Unable to retrieve your location");
  }

  function handleTrackLocation() {
    if (!navigator.geolocation) {
      setLocationErrorMessage("Unable to retrieve your location");
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      setIsFindingLocation(true);
      setLocationErrorMessage("");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  return {
    isFindingLocation,
    longLat,
    locationErrorMessage,
    handleTrackLocation,
  };
};

export default useTrackLocation;
