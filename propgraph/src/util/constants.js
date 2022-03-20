import * as L from "leaflet";

export const APP_NAME = "PropGraph";
export const APP_DESC = "Graph-based real estate valuation";

const LeafIcon = L.Icon.extend({
  options: {},
});

export const blueIcon = new LeafIcon({
  iconUrl:
    "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF",
});
export const greenIcon = new LeafIcon({
  iconUrl:
    "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF",
});

export const grayIcon = new LeafIcon({
  iconUrl:
    "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|bbbbbb&chf=a,s,ee00FFFF",
});

export const FILTER_FIELDS = ["beds", "baths", "sqft"];
