import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  Circle,
} from "@react-google-maps/api";
import { useRef, useState, useEffect } from "react";
import { MdMyLocation } from "react-icons/md";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "1rem",
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: "all",
      elementType: "labels.text.fill",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "all",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#000000" }, { lightness: 13 }],
    },
    {
      featureType: "administrative",
      elementType: "geometry.fill",
      stylers: [{ color: "#000000" }],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [{ color: "#08304b" }],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [{ color: "#0c4152" }, { lightness: 5 }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{ color: "#000000" }],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [{ color: "#021019" }],
    },
  ],
};

interface Lawyer {
  id: number;
  name: string;
  location: string;
  lat: number;
  lng: number;
}

interface MapSectionProps {
  lawyers: Lawyer[];
}

interface Location {
  lat: number;
  lng: number;
}

export default function MapSection({ lawyers }: MapSectionProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedLawyer, setSelectedLawyer] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lastLocation");
      return saved
        ? JSON.parse(saved)
        : {
            lat: -6.2088,
            lng: 106.8456,
          };
    }
    return {
      lat: -6.2088,
      lng: 106.8456,
    };
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBl12-VCiWi3n1L5Z4QVG6O_oSVYfLMMLg",
  });

  // Fungsi utk scroll ke map & zoom ke lokasi lawyer
  const scrollToLawyer = (lawyerId: number) => {
    const lawyer = lawyers.find((l) => l.id === lawyerId);
    if (!lawyer || !mapRef.current) return;

    setSelectedLawyer(lawyerId);

    // Scroll ke map
    const mapElement = document.getElementById("lawyer-map");
    mapElement?.scrollIntoView({ behavior: "smooth" });

    // Zoom ke lokasi lawyer
    mapRef.current.panTo({ lat: lawyer.lat, lng: lawyer.lng });
    mapRef.current.setZoom(15);

    // Reset selected lawyer after 3 seconds
    setTimeout(() => setSelectedLawyer(null), 3000);
  };

  // Expose scrollToLawyer function
  if (typeof window !== "undefined") {
    (window as any).scrollToLawyer = scrollToLawyer;
  }

  useEffect(() => {
    if (userLocation) {
      localStorage.setItem("lastLocation", JSON.stringify(userLocation));
    }
  }, [userLocation]);

  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          setMapCenter(location);
          localStorage.setItem("lastLocation", JSON.stringify(location));

          if (mapRef.current) {
            mapRef.current.panTo(location);
            mapRef.current.setZoom(16);
          }
          setIsLoading(false);
        },
        (error) => {
          console.error("Error:", error);
          setIsLoading(false);
          alert(
            "Gagal mendapatkan lokasi. Pastikan GPS aktif dan izin lokasi diberikan."
          );
        },
        options
      );
    }
  };

  if (!isLoaded)
    return (
      <div className="w-full h-[500px] bg-slate-800 rounded-xl animate-pulse">
        <div className="h-full flex items-center justify-center text-gray-400">
          Loading Map...
        </div>
      </div>
    );

  return (
    <section className="py-12" id="lawyer-map">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Lokasi Pengacara
          </h2>
          <p className="text-gray-400">
            Temukan pengacara terdekat di lokasi Anda
          </p>
          <button
            onClick={getCurrentLocation}
            className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg
              flex items-center justify-center gap-2 mx-auto hover:from-blue-600 hover:to-blue-700
              transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-blue-500/50
              disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            <MdMyLocation className="text-xl" />
            {isLoading ? "Mencari lokasi..." : "Lihat Lokasi Saya"}
          </button>
        </div>

        <div className="bg-slate-800 p-1 rounded-xl">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter} // Use mapCenter instead of static center
            zoom={12}
            options={mapOptions}
            onLoad={(map) => {
              mapRef.current = map;
            }}
          >
            {userLocation && (
              <>
                <MarkerF
                  position={userLocation}
                  icon={{
                    path: 0, // Circle
                    fillColor: "#4285F4",
                    fillOpacity: 1,
                    strokeColor: "#ffffff",
                    strokeWeight: 2,
                    scale: 8,
                  }}
                />
                <Circle
                  center={userLocation}
                  radius={50}
                  options={{
                    fillColor: "#4285F4",
                    fillOpacity: 0.1,
                    strokeColor: "#4285F4",
                    strokeOpacity: 0.3,
                    strokeWeight: 2,
                  }}
                />
              </>
            )}
            {lawyers.map((lawyer) => (
              <MarkerF
                key={lawyer.id}
                position={{ lat: lawyer.lat, lng: lawyer.lng }}
                title={`${lawyer.name} - ${lawyer.location}`}
                animation={
                  selectedLawyer === lawyer.id
                    ? google.maps.Animation.BOUNCE
                    : undefined
                }
              />
            ))}
          </GoogleMap>
        </div>
      </div>
    </section>
  );
}
