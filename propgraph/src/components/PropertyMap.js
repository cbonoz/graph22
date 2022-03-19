import { Button } from "antd";
import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  ZoomControl,
} from "react-leaflet";

import "./PropertyMap.css";

const lineOptions = { color: "green" };

const getLatLng = (property) => [property.Y, property.X];

export default function PropertyMap() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePrice, setActivePrice] = useState(undefined);
  const [properties, setProperties] = useState([]);
  const [requesting, setRequesting] = useState(false);
  const [purchaseResult, setPurchaseResult] = useState(undefined);
  const [error, setError] = useState("");
  const [map, setMap] = useState(null);

  const getPrice = async () => {};

  const addProperty = (result) => {
    setResults([]);
    const newProperties = [...properties, result];
    setProperties(newProperties);
    map.flyTo(getLatLng(result), 12);
    if (newProperties.length > 1) {
      map.fitBounds(newProperties.map(getLatLng));
    }
    setQuery(null);
  };

  const completePurchase = async () => {};

  const clearProperties = () => {
    setPurchaseResult(undefined);
    setActivePrice(undefined);
    setRequesting(false);
    setProperties([]);
    setQuery("");
  };

  const getPropertyName = (p) => p.address || "{Property Address}";

  const getPriceForRoute = async () => {};

  // useEffect(() => {
  //   if (query) {
  //     setResults(fuse.search(query));
  //   } else {
  //   }
  // }, [query]);

  const property = (properties && properties[properties.length - 1]) || {};

  let inputValue = "";
  if (query !== null || query) {
    inputValue = query;
  } else if (property) {
    inputValue = `${property.ADDRESS1} ${property.STNNAME}`;
  }

  const position = [property.Y || 42.36, property.X || -71.059];

  return (
    <div>
      <div className="columns">
        <div className="column is-full map-container">
          <div className="box-overlay">
            <b>Search for a property:</b>
            <input
              onChange={(e) => setQuery(e.target.value)}
              value={inputValue}
              className="input is-primary"
            />
            <br />
            {results.slice(0, 5).map((result, i) => {
              const { item } = result;
              return (
                <div
                  key={i}
                  onClick={() => addProperty(item)}
                  className="result-box"
                >
                  {i + 1}: {getPropertyName(item)}
                </div>
              );
            })}
            {properties.length > 0 && (
              <div>
                <div>
                  <div>
                    <br />
                    <b>Last Property:</b>
                    <br />
                    {property.X} {property.Y}
                    <p>{property.STNNAME}</p>
                    <p>{property.ADDRESS1}</p>
                  </div>
                  <hr />
                  <hr />
                  <div>
                    <b>Purchase Ticket</b>
                  </div>
                  {!requesting && (
                    <span>
                      <button
                        className="btn is-primary"
                        onClick={getPriceForRoute}
                        disabled={loading}
                      >
                        Request Price
                      </button>
                      &nbsp;
                    </span>
                  )}
                  <button
                    className="btn is-primary"
                    onClick={clearProperties}
                    disabled={loading}
                  >
                    Clear Route
                  </button>
                </div>
              </div>
            )}
            {loading && <p>Transaction in progress...</p>}
          </div>
          <MapContainer
            className="leaflet-container"
            center={position}
            zoom={13}
            zoomControl={false}
            scrollWheelZoom={false}
            whenCreated={setMap}
          >
            <ZoomControl position="bottomright" />
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {properties.map((s, i) => (
              <Marker position={getLatLng(s)} key={i}>
                <Popup>
                  <b>STATION (stop {i + 1})</b>
                  <br />
                  {JSON.stringify(getLatLng(s))}
                  <br />
                  {s.STNNAME}
                  <br />
                  {s.ADDRESS1}
                </Popup>
              </Marker>
            ))}
            {properties.map((s, i) => (
              <Polyline
                pathOptions={lineOptions}
                positions={properties.map(getLatLng)}
                key={i}
              />
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
