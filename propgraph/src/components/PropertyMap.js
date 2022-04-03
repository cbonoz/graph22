import { Button, Radio } from "antd";
import React, { useState, useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  ZoomControl,
} from "react-leaflet";
import { formatMoney, getAverage } from "../util";

import {
  getPrediction,
  getProperties,
  markComparable,
  postComparable,
} from "../util/api";
import { FILTER_FIELDS, grayIcon, greenIcon } from "../util/constants";

import "./PropertyMap.css";
import PropertyView from "./PropertyView";

const lineOptions = { color: "green" };

const getLatLng = (property) => [property.lat, property.lng];

//  Create the Icon

export default function PropertyMap() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState();
  const [activeField, setActiveField] = useState();
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [property, setProperty] = useState(); // active property.
  const [comparable, setComparable] = useState();
  const [error, setError] = useState("");
  const [map, setMap] = useState(null);

  const getPrice = async () => {};

  const addProperty = (result) => {
    const newProperties = [...properties, result];
    setProperties(newProperties);
    map.flyTo(getLatLng(result), 12);
    if (newProperties.length > 1) {
      map.fitBounds(newProperties.map(getLatLng));
    }
    setQuery(null);
  };

  const fetchPrediction = async () => {
    if (true) {
      const prediction = formatMoney(
        getAverage(connectedProperties.map((x) => x.price))
      );
      setResult({ prediction });
      return;
    }
    setLoading(true);
    try {
      const res = await getPrediction(property);
      setResult(res.data);
    } catch (e) {
      console.error(e);
      alert(e.toString());
    } finally {
      setLoading(false);
    }
  };

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const bounds = map.getBounds();
      const top_right = bounds.getNorthEast();
      const bottom_left = bounds.getSouthWest();
      const body = { top_right, bottom_left };
      const res = await getProperties(body);
      setProperties(res.data);
    } catch (e) {
      console.error(e);
      alert(e.toString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResult(undefined);
    setComparable(undefined);
  }, [property]);

  useEffect(() => {
    setResult(undefined);
  }, [activeField, comparable]);

  // let inputValue = "";
  // if (query !== null || query) {
  //   inputValue = query;
  // } else if (property) {
  //   inputValue = `${property.ADDRESS1} ${property.STNNAME}`;
  // }

  const position = [42.36, -71.059];

  useEffect(() => {
    console.log("selected", property);
  }, [property]);

  const connectedProperties = useMemo(() => {
    if (!activeField) {
      return property ? [property] : [];
    }
    return properties.filter((p) => p[activeField] === property[activeField]);
  }, [property, activeField, properties]);

  const filterActive = activeField && property;
  const shownProperties = filterActive ? connectedProperties : properties;

  const updateField = (v) => {
    console.log("change", activeField, v);
    if (activeField === v) {
      setActiveField(undefined);
    } else {
      setActiveField(v);
    }
  };

  const markComparable = async (e) => {
    e.preventDefault();
    if (!property.mls_id) {
      // Requires mls_id indexed.
      alert(
        "Unable to mark as comparable, could not find mls id. Please try another property."
      );
      return;
    }
    setLoading(true);
    const body = {
      id1: property.mls_id,
      id2: comparable.mls_id,
    };
    try {
      const data = await postComparable(body);
      alert("Successfully marked as comparable properties.");
    } catch (e) {
      console.error(e);
      alert("Unable to mark as comparable: " + e.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="columns">
        <div className="column is-full map-container">
          <div className="box-overlay">
            {/* <b>Search for a property:</b>
            <input
              onChange={(e) => setQuery(e.target.value)}
              value={inputValue}
              className="input is-primary"
            /> */}
            <Button
              onClick={fetchProperties}
              className="standard-btn"
              disabled={loading}
              type="primary"
            >
              Refresh
            </Button>
            <br />
            {}
            {(!properties || properties.length === 0) && (
              <div>
                <h3>No properties found.</h3>
                <p>Upload or refresh the map view to discover properties.</p>
              </div>
            )}
            {properties && properties.length > 0 && (
              <div>
                {!property && <h3>Select a property to begin:</h3>}
                {property && <h3>Selected property:</h3>}
              </div>
            )}

            {property && (
              <div>
                <PropertyView property={property} />
                <br />
                <div>
                  <Radio.Group
                    // onChange={(e) => updateField(e.target.value)}
                    value={activeField}
                  >
                    {FILTER_FIELDS.map((f, i) => {
                      return (
                        <Radio.Button
                          key={i}
                          value={f}
                          onClick={() => updateField(f)}
                        >
                          {f}
                        </Radio.Button>
                      );
                    })}
                  </Radio.Group>
                  {activeField && (
                    <p className="success">
                      <br />
                      Showing {connectedProperties.length} properties with
                      matching {activeField} ({property[activeField]})
                    </p>
                  )}

                  <Button
                    onClick={fetchPrediction}
                    className="standard-btn"
                    disabled={loading}
                    type="secondary"
                  >
                    Get Prediction
                  </Button>
                  <br />
                  {result && result.prediction && (
                    <div>
                      <b>{result.prediction}</b> (based on {activeField})
                    </div>
                  )}
                  {comparable && (
                    <span>
                      <hr />
                      <b>{comparable.address}</b>
                      <br />
                      <a href="#" onClick={markComparable}>
                        Mark comparable
                      </a>
                    </span>
                  )}
                </div>
              </div>
            )}
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

            {shownProperties.map((s, i) => {
              const active = s.address === property?.address;
              const fieldMatch =
                filterActive && s[activeField] === property[activeField];
              const selected = active || fieldMatch;
              return (
                <Marker
                  // icon={selected ? greenIcon : grayIcon}
                  position={getLatLng(s)}
                  key={i}
                  eventHandlers={{
                    click: (e) => {
                      console.log("select", s);
                      if (property && !active) {
                        // Set compared.
                        setComparable(s);
                      }
                    },
                  }}
                >
                  <Popup>
                    <PropertyView property={s} />
                    {!active && (
                      <Button
                        size="small"
                        type="primary"
                        className="standard-btn"
                        onClick={() => setProperty(s)}
                      >
                        Mark active
                      </Button>
                    )}
                  </Popup>
                </Marker>
              );
            })}

            {connectedProperties.map((p, i) => {
              return (
                <Polyline
                  pathOptions={lineOptions}
                  positions={[getLatLng(property), getLatLng(p)]}
                  key={i}
                />
              );
            })}
            {/* {properties.map((s, i) => (
              <Polyline
                pathOptions={lineOptions}
                positions={properties.map(getLatLng)}
                key={i}
              />
            ))} */}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
