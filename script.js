let map;
let marker;

function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        if (!map) {
          map = new google.maps.Map(document.getElementById("map"), {
            zoom: 15,
            center: userLocation,
          });

          marker = new google.maps.Marker({
            position: userLocation,
            map: map,
            title: "You are here",
          });
        } else {
          marker.setPosition(userLocation);
          map.setCenter(userLocation);
        }

        // Update lat/lng display
        document.getElementById("coords").innerText =
          `Latitude: ${userLocation.lat.toFixed(5)}, Longitude: ${userLocation.lng.toFixed(5)}`;
      },
      (error) => {
        console.error("Error getting location", error);
      },
      { enableHighAccuracy: true }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
