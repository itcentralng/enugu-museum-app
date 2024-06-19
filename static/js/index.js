fetch("static/data/map-data.geojson")
  .then((response) => response.json())
  .then((data) => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYW1lZW51IiwiYSI6ImNrOTFwcHdlYjAwOGczbmt5Mzk1eHBoNDYifQ.BwOWHvAtshdRUF--Y4kimQ";

    const map = new mapboxgl.Map({
      container: "map", // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: "mapbox://styles/mapbox/light-v11", // style URL
      center: [7.46275, 6.499083], // starting position
      zoom: 8, // starting zoom
    });

    const selectArea = () => {};
    const deselectArea = () => {};

    map.on("load", () => {
      data.features.forEach((area) => {
        map.addSource(area.properties.shape2, {
          type: "geojson",
          data: area,
        });
        map.addLayer({
          id: area.properties.shape2,
          type: "fill",
          source: area.properties.shape2, // reference the data source
          layout: {},
          paint: {
            "fill-color": "#0080ff", // blue color fill
            "fill-opacity": 1, // 100% opaque
            "fill-opacity-transition": { duration: 500 }, // 500 milliseconds = 1/2 seconds
          },
        });

        map.addLayer({
          id: area.properties.shape2 + "-outline",
          type: "line",
          source: area.properties.shape2,
          layout: {},
          paint: {
            "line-color": "#000",
            "line-width": 2,
          },
        });
      });

      // Test
      map.setPaintProperty("Udenu", "fill-opacity", 0);
      // If a layer with ID 'state-data' exists, remove it.
      if (map.getLayer("Udenu")) map.removeLayer("Udenu-outline");
    });
  });
