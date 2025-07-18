<template>
  <!-- <div id="map" :class="map_class" ref="mapContainer"></div> -->
  <div
    class="border border-[#9ecce4] overflow-hidden rounded-lg"
    :class="map_class"
  >
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7261347364497!2d36.754291975215125!3d-1.3406616986466275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1acba9c4f595%3A0x81a153bc5aaf831a!2sLangata%20Rd%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1742544986235!5m2!1sen!2ske"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      class="w-full h-full"
    ></iframe>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

defineProps({
  map_class: {
    type: String,
    required: true,
  },
});

// Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url)
    .href,
});

const mapContainer = ref(null);

// Define markers locally
const markers = [
  {
    position: [1.3407, 36.7568],
    popupText: "<span class='text-white'>The Well Mall, Nairobi</span>",
  },
  {
    position: [0.053, 35.7298],
    popupText: "<span class='text-white'>Eldama Ravine, Baringo</span>",
  },
  {
    position: [52.6696, 0.7266],
    popupText: "<span class='text-white'>Oakham, United Kingdom</span>",
  },
];

onMounted(() => {
  const map = L.map(mapContainer.value).setView([0.0236, 37.9062], 6);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // Loop through and add local markers
  markers.forEach((marker) => {
    L.marker(marker.position)
      .addTo(map)
      .bindPopup(marker.popupText || "Marker");
  });
});
</script>
<!-- 
<template>
  <div :class="map_class" ref="mapContainer"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";

export default {
  name: "MapboxMap",
  props: {
    map_class: {
      type: String,
      default: "mapbox-container",
    },
  },
  data() {
    return {
      markers: [
        { lng: 36.8219, lat: -1.2921, popup: "📍 Nairobi" },
        { lng: 37.0741, lat: -0.5143, popup: "📍 Machakos" },
        { lng: 36.9583, lat: -1.1027, popup: "📍 Kiambu" },
      ],
    };
  },
  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZ2Vvcmdla2ltYWd1dCIsImEiOiJjbWJ3OTJqcWMwdXl0MmlzMTkzaGJocWl1In0.7PFlSGQ1ulYTAgBTooFySQ";

    const validMarkers = this.markers.filter(
      (m) =>
        typeof m.lng === "number" &&
        typeof m.lat === "number" &&
        !isNaN(m.lng) &&
        !isNaN(m.lat)
    );

    const map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: "mapbox://styles/mapbox/navigation-day-v1",
      center: validMarkers.length
        ? [validMarkers[0].lng, validMarkers[0].lat]
        : [37.6213, -1.2921],
      zoom: 9,
    });

    validMarkers.forEach(({ lng, lat, popup }) => {
      const marker = new mapboxgl.Marker().setLngLat([lng, lat]);

      if (popup) {
        const popupElement = new mapboxgl.Popup().setHTML(popup);
        marker.setPopup(popupElement);
      }

      marker.addTo(map);
    });
  },
};
</script> -->
