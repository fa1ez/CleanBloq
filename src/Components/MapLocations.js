import React, { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

const locations = [
  {
    city: "Islamabad",
    longitude: 73.047882,
    latitude: 33.684422,
    day: "Monday",
    time: "12:35:10",
  },
  {
    city: "Lahore",
    longitude: 74.358749,
    latitude: 31.52037,
    day: "Tuesday",
    time: "01:35:10",
  },
  {
    city: "Lahore",
    longitude: 74.358749,
    latitude: 31.520379,
    day: "Monday",
    time: "01:35:10",
  },
  {
    city: "Lahore",
    longitude: 74.35874,
    latitude: 31.52035,
    day: "Thursday",
    time: "06:35:10",
  },
  {
    city: "Karachi",
    longitude: 67.00114,
    latitude: 24.86075,
    day: "Friday",
    time: "03:15:40",
  },
  {
    city: "Karachi",
    longitude: 67.001137,
    latitude: 24.860735,
    day: "Monday",
    time: "02:11:12",
  },

  {
    city: "Multan",
    longitude: 71.524918,
    latitude: 30.157457,
    day: "Monday",
    time: "02:11:12",
  },
];

export default function MapLocations() {
  const [position, setPosition] = useState([33.684422, 73.047882]);

  return (
    <>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "100vw", height: "100%" }}
        icon={
          new Icon({
            iconUrl: markerIconPng,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location) => (
          <Marker
            // key={}
            position={[location.latitude, location.longitude]}
            onClick={() => {
              console.log("aaaa");
            }}
          >
            <Popup>
              {location.latitude},{location.longitude}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <button
        onClick={() => {
          setPosition([0, 0]);
          console.log(position);
        }}
        style={{ position: "absolute" }}
      />
    </>
  );
}
