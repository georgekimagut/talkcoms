<template>
  <div
    id="map"
    class="border border-[#9ecce4] overflow-hidden rounded-lg"
    :class="map_class"
    ref="mapContainer"
  ></div>
</template>

<script setup>
/* google maps */
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
    position: [-1.3406616986466275, 36.754291975215125],
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
    const customIcon = L.divIcon({
      html: "<i class='fa-solid fa-location-dot text-red-500 text-3xl'></i>",
      className: "leaflet-fa-icon", // suppress default styles
      iconSize: [24, 24],
      iconAnchor: [12, 24],
      popupAnchor: [0, -24],
    });

    L.marker(marker.position, { icon: customIcon })
      .addTo(map)
      .bindPopup(marker.popupText || "Marker");
  });
});
</script>
