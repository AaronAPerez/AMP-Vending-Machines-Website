'use client';

import { useState, useCallback } from 'react';
import GoogleMapComponent from '../landing/GoogleMapComponent';
import { LoadScript } from '@react-google-maps/api';


const containerStyle = {
  width: '100%',
  height: '400px'
};

// Replace with your actual business coordinates
const center = {
  lat: 37.6390972, // Modesto coordinates
  lng: -120.9968782
};

interface ContactMapProps {
  apiKey: string;
}

export default function ContactMap({ apiKey }: ContactMapProps) {
  // Define state and hooks at the top level
  const [, setIsLoaded] = useState(false);

  // Move all hooks to the top level of the component
  const onLoad = useCallback(() => {
    console.log('Map loaded successfully');
    setIsLoaded(true);
  }, []);

  const onUnmount = useCallback(() => {
    console.log('Map unmounted');
  }, []);

  // Conditional rendering with regular if statement is fine
  if (!apiKey) {
    return (
      <div
        className="bg-[#4d4d4d] w-full h-[400px] flex items-center justify-center border border-[#a4acac]"
      >
        <div className="text-center text-[#A5ACAF]">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-lg font-medium">Map Loading</p>
          <p className="text-sm">Please set up a Google Maps API key</p>
        </div>
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={apiKey} onLoad={() => setIsLoaded(true)}>
      <GoogleMapComponent
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
            { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
            { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] },
            { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
            { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
            { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
            { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
            { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] },
            { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
            { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
            { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
            { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
            { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
            { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] }
          ]
        }} apiKey={''} />
      {/* Use a basic marker to avoid issues with google.maps reference */}
      {/* If you want to render a marker, do it inside GoogleMapComponent or extend its props */}
    </LoadScript>
  );
};