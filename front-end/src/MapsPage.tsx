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
  
    useEffect(() => {
      if (ref.current && !map) {
        const newMap = new window.google.maps.Map(ref.current, {
          center,
          zoom,
        });
        setMap(newMap);
      }
    }, [ref, map, center, zoom]);
  
    return (
      <div 
        ref={ref} 
        style={{
          height: "400px",
          width: "100%",
        }}
      />
    );
  }
  