import { useEffect, useRef, useState } from "react";

interface MapComponentProps {
    center?: { lat: number; lng: number };
    zoom?: number;
  }
  

  export default function MapComponent({ 
    center = { lat: 4.4333479181711075, lng: -75.21505129646759 },
    zoom = 10 
  }: MapComponentProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  
    useEffect(() => {
      if (ref.current && !map) {
        const newMap = new window.google.maps.Map(ref.current, {
          center,
          zoom,
        });
        setMap(newMap);
      }
    }, [ref, map, center, zoom]);
  
    useEffect(() => {
      if (map) {
        const markerData = [
          { lat: 4.4333479181711075, lng: -75.21505129646759 },
          { lat: 4.4333479181711075, lng: -75.21505129646759 + 0.01 },
          { lat: 4.4333479181711075, lng: -75.21505129646759 + 0.02 },
        ];
  
        markerData.forEach((marker) => {
          const newMarker = new window.google.maps.Marker({
            position: marker,
            map: map,
            title: "Hello World!",
          });
          setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
        });
      }
    }, [map]);
  

    return (
      <div 
        ref={ref} 
        style={{
          height: "700px",
          width: "100%",
        }}
      />
    );
  }
  