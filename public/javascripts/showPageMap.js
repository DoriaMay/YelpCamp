 mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', 
        style: 'mapbox://styles/mapbox/streets-v11',   // stylesheet locations
        center: campground.geometry.coordinates,      // staring position [lng, lat]
        zoom: 10  // staring zoom
});

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map)
