import { map } from "./initGlobe.js";

let areas;
fetch("static/data/map-data.geojson")
  .then((response) => response.json())
  .then((areasRes) => {
    areas = areasRes;
  });

// Resource coords & zoom levels
const coords = {
  Sandstone: { x: 7.3, y: 6.3, zoom: 9 },
  Coal: { x: 7, y: 6.5, zoom: 8.9 },
  "Oil Shale": { x: 7.2, y: 6.25, zoom: 9 },
  Gas: { x: 6.9, y: 6.7, zoom: 9 },
  Ironstone: { x: 6.9, y: 6.5, zoom: 8.7 },
  "Clay Minerals": { x: 7, y: 6.5, zoom: 9 },
  Limestone: { x: 7.2, y: 6.3, zoom: 9 },
  Gypsum: { x: 6.8, y: 6.7, zoom: 9.2 },
  Alum: { x: 7.35, y: 6.3, zoom: 10.2 },
  Alluvium: { x: 7.35, y: 6.15, zoom: 10 },
  Kaolin: { x: 6.93, y: 6.65, zoom: 9 },
  "Lead & Zinc": { x: 7.3, y: 6.13, zoom: 9.4 },
  Granite: { x: 7.4, y: 6.3, zoom: 9.1 },
  "Iron Ore": { x: 7.2, y: 6.45, zoom: 9.4 },
  Clay: { x: 7.2, y: 6.2, zoom: 9.6 },
};

// Zoom to Resource
const zoomToResource = (resourceName) => {
  const resource = coords[resourceName];
  if (resource) {
    map.rotateTo(0, { duration: 0 });
    map.flyTo({
      center: [resource.x, resource.y],
      speed: 1,
      zoom: resource.zoom,
      pitch: 0,
    });
  } else {
    console.error(`Resource ${resourceName} not found.`);
  }
};

const zoomOut = () => {
  map.zoomTo(1.5, {
    duration: 2000,
    center: [7.46275, 6.499083],
    pitch: 20,
  });
};

// Highlight Resource Areas
const highlightArea = (areaName) => {
  const area = areas.features.find(
    (area) => area.properties.shape2 == areaName
  );

  if (!area) {
    console.log(`Area ${areaName} not found`);
    return;
  }

  if (!map.getSource(area.properties.shape2)) {
    map.addSource(area.properties.shape2, {
      type: "geojson",
      data: area,
    });
  }

  if (!map.getLayer(area.properties.shape2)) {
    map.addLayer({
      id: area.properties.shape2,
      type: "fill",
      source: area.properties.shape2,
      layout: {},
      paint: {
        "fill-color": "#EF6A39",
        "fill-opacity": 0.7,
        "fill-opacity-transition": { duration: 300 },
      },
    });
  }

  if (!map.getLayer(area.properties.shape2 + "-outline")) {
    map.addLayer({
      id: area.properties.shape2 + "-outline",
      type: "line",
      source: area.properties.shape2,
      layout: {},
      paint: {
        "line-color": "rgba(0, 0, 0, 0.7)",
        "line-width": 2,
      },
    });
  } else {
    map.setPaintProperty(areaName, "fill-opacity", 0.7);
    map.setPaintProperty(
      areaName + "-outline",
      "line-color",
      "rgba(0, 0, 0, 0.5)"
    );
  }
};

// Remove Resource area Highlighting
const deselectArea = (areaName) => {
  map.setPaintProperty(areaName, "fill-opacity", 0);
  map.setPaintProperty(areaName + "-outline", "line-color", "rgba(0, 0, 0, 0)");
};

const labelCoords = {
  Udenu: { name: "Udenu", coord: [7.568128414794562, 6.902689158977569] },
  "Enugu South": {
    name: "Enugu South",
    coord: [7.5139944336961639, 6.410654010484201],
  },
  "Nkanu East": {
    name: "Nkanu East",
    coord: [7.660996907781123, 6.439308957642309],
  },
  "Igbo Eze North": {
    name: "Igbo Eze North",
    coord: [7.502215137368748, 7.04],
  },
  "Igbo Eze South": {
    name: "Igbo Eze South",
    coord: [7.37777, 6.98768802],
  },
  Nsukka: { name: "Nsukka", coord: [7.4, 6.85] },
  "Nkanu West": {
    name: "Nkanu West",
    coord: [7.546996907781123, 6.339608957642309],
  },
  "Oji River": {
    name: "Oji River",
    coord: [7.290038024335388, 6.178287095073438],
  },
  "Isi-Uzo": {
    name: "Isi-Uzo",
    coord: [7.70438512507352, 6.780977921394026],
  },
  Aninri: { name: "Aninri", coord: [7.588673691038051, 6.074119154875143] },
  "Uzo-Uwani": { name: "Uzo-Uwani", coord: [7.15, 6.8] },
  "Enugu East": {
    name: "Enugu East",
    coord: [7.5139944336961639, 6.570054010484201],
  },
  "Igbo Etiti": {
    name: "Igbo Etiti",
    coord: [7.401661465903976, 6.736747111090381],
  },
  Udi: { name: "Udi", coord: [7.33337682687978, 6.6006787775835246] },
  "Enugu North": {
    name: "Enugu North",
    coord: [7.5139944336961639, 6.470254010484201],
  },
  Awgu: { name: "Awgu", coord: [7.448709255727611, 6.217233643018233] },
  Ezeagu: { name: "Ezeagu", coord: [7.200038024335388, 6.438287095073438] },
};

// Function to add all labels to the map
function addAllTextToMap() {
  for (const key in labelCoords) {
    if (labelCoords.hasOwnProperty(key)) {
      const lga = labelCoords[key];
      const coords = lga.coord;
      const text = lga.name;

      const sourceId = `point-${coords.join("-")}`;
      const layerId = `layer-${coords.join("-")}`;

      // Add source if it doesn't exist
      if (!map.getSource(sourceId)) {
        map.addSource(sourceId, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: coords, // Coordinates of the point
                },
                properties: {
                  title: text, // Text to display
                },
              },
            ],
          },
        });
      }

      // Add a symbol layer to display the text
      if (!map.getLayer(layerId)) {
        map.addLayer({
          id: layerId,
          type: "symbol",
          source: sourceId,
          layout: {
            "text-field": ["get", "title"], // Use the 'title' property for the text
            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
            "text-offset": [0, 0.6],
            "text-anchor": "top",
          },
          paint: {
            "text-color": "#000", // Set the text color
          },
        });
      }
    }
  }
}

function removeAllTextFromMap() {
  for (const key in labelCoords) {
    if (labelCoords.hasOwnProperty(key)) {
      const lga = labelCoords[key];
      const coords = lga.coord;

      const sourceId = `point-${coords.join("-")}`;
      const layerId = `layer-${coords.join("-")}`;

      // Remove layer if it exists
      if (map.getLayer(layerId)) {
        map.removeLayer(layerId);
      }

      // Remove source if it exists
      if (map.getSource(sourceId)) {
        map.removeSource(sourceId);
      }
    }
  }
}

map.on("load", () => {
  if (map.getLayer("background")) {
    map.setPaintProperty(
      "background",
      "background-color",
      "rgba(200, 125, 50, 0.3)"
    );
  } else {
    map.addLayer({
      id: "background",
      type: "background",
      paint: {
        "background-color": "rgba(200, 125, 50, 0.3)",
      },
    });
  }
  areas.features.forEach((area) => {
    const ifExists = map.getSource(area.properties.shape2);
    if (!ifExists) {
      map.addSource(area.properties.shape2, {
        type: "geojson",
        data: area,
      });
    }
  });
});
export {
  zoomToResource,
  zoomOut,
  addAllTextToMap,
  removeAllTextFromMap,
  highlightArea,
  deselectArea,
};
