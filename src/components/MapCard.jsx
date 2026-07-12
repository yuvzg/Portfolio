import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, Eyebrow } from "./Card.jsx";
import { map as mapCfg } from "../data.js";

export default function MapCard({ delay = 0 }) {
  const holderRef = useRef(null);

  useEffect(() => {
    const holder = holderRef.current;
    if (!holder) return;

    const map = L.map(holder, {
      center: [mapCfg.lat, mapCfg.lng],
      zoom: mapCfg.zoom,
      zoomControl: false,
      scrollWheelZoom: false,
      attributionControl: true,
    });

    L.tileLayer("https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    // soft halo + solid crimson dot
    L.circleMarker([mapCfg.lat, mapCfg.lng], {
      radius: 16,
      color: "transparent",
      fillColor: "#b0262f",
      fillOpacity: 0.25,
    }).addTo(map);
    L.circleMarker([mapCfg.lat, mapCfg.lng], {
      radius: 7,
      color: "#f4eded",
      weight: 2,
      fillColor: "#b0262f",
      fillOpacity: 1,
    })
      .addTo(map)
      .bindTooltip(mapCfg.city, { direction: "top", offset: [0, -10] });

    return () => map.remove();
  }, []);

  return (
    <Card className="relative !p-0 overflow-hidden" delay={delay}>
      <div className="pointer-events-none absolute left-7 top-7 z-[500]">
        <Eyebrow>based in</Eyebrow>
      </div>
      <div ref={holderRef} className="h-full min-h-[300px] w-full" aria-label={`Map showing ${mapCfg.city}`} />
    </Card>
  );
}
