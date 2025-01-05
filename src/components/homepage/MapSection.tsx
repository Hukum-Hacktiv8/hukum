"use client";

import { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps";
import { motion } from "framer-motion";
import Image from "next/image";

interface Lawyer {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  distance: string;
  image: string;
  coordinates: [number, number];
}

const lawyers: Lawyer[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    specialty: "Corporate Law",
    rating: 4.8,
    distance: "0.5 km",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    coordinates: [-6.2088, 106.8456], // Example coordinates for Jakarta
  },
  {
    id: 2,
    name: "Michael Chen",
    specialty: "Criminal Defense",
    rating: 4.9,
    distance: "1.2 km",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    coordinates: [-6.21, 106.847],
  },
  {
    id: 3,
    name: "Emma Davis",
    specialty: "Family Law",
    rating: 4.7,
    distance: "1.8 km",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    coordinates: [-6.2076, 106.844],
  },
  {
    id: 4,
    name: "David Wilson",
    specialty: "Intellectual Property",
    rating: 4.9,
    distance: "2.1 km",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    coordinates: [-6.2095, 106.846],
  },
  {
    id: 5,
    name: "Lisa Chang",
    specialty: "Employment Law",
    rating: 4.7,
    distance: "2.5 km",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    coordinates: [-6.2082, 106.8445],
  },
  {
    id: 6,
    name: "James Martinez",
    specialty: "Immigration Law",
    rating: 4.8,
    distance: "2.8 km",
    image: "https://images.unsplash.com/photo-1563807894768-f28bee0d37b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    coordinates: [-6.207, 106.847],
  },
];

export default function MapSection() {
  const [center, setCenter] = useState<[number, number]>([-6.2088, 106.8456]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [zoom, setZoom] = useState(14);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoading(true);

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = parseFloat(position.coords.latitude.toFixed(6));
          const lng = parseFloat(position.coords.longitude.toFixed(6));
          const newLocation: [number, number] = [lat, lng];

          setUserLocation(newLocation);
          setCenter(newLocation);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoading(false);
          // Keep the default center if there's an error
        },
        options
      );
    }
  }, []); // Run only once on component mount

  const handleLawyerClick = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    setCenter(lawyer.coordinates);
    setZoom(16);
  };

  const centerToUserLocation = () => {
    if (userLocation) {
      setCenter(userLocation);
      setZoom(15);
    }
  };

  return (
    <section className="py-12 bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
          <h2 className="text-4xl font-lora text-[#DAA520] mb-4">Find Lawyers Near You</h2>
          <p className="text-white/80 max-w-2xl mx-auto">Connect with experienced legal professionals in your area</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-[65%] h-[500px] rounded-xl overflow-hidden border border-[#B8860B]/20 relative">
            {isLoading ? (
              <div className="h-full flex items-center justify-center bg-slate-800">
                <div className="text-white">Loading map...</div>
              </div>
            ) : (
              <Map
                height={500}
                center={center}
                zoom={zoom}
                onBoundsChanged={({ zoom }) => {
                  // Only update zoom, ignore center changes
                  setZoom(zoom);
                }}
                // Add these props to improve map behavior
                animate={true}
                minZoom={12}
                maxZoom={18}>
                {userLocation && (
                  <Marker width={50} anchor={userLocation} color="#3b82f6">
                    <div className="relative">
                      <div className="absolute -top-2 -left-2 w-4 h-4 bg-blue-500 rounded-full animate-ping" />
                      <div className="w-4 h-4 bg-blue-500 rounded-full" />
                    </div>
                  </Marker>
                )}
                {lawyers.map((lawyer) => (
                  <Marker key={lawyer.id} width={50} anchor={lawyer.coordinates} onClick={() => handleLawyerClick(lawyer)}>
                    <div className="relative group">
                      <Image src={lawyer.image} alt={lawyer.name} className={`w-10 h-10 rounded-full border-2 transition-all ${selectedLawyer?.id === lawyer.id ? "border-[#DAA520] scale-125" : "border-[#B8860B] group-hover:scale-110"}`} fill sizes="100vw" />
                      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-slate-800 p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity w-48">
                        <p className="text-white text-sm font-semibold">{lawyer.name}</p>
                        <p className="text-[#DAA520] text-xs">{lawyer.specialty}</p>
                      </div>
                    </div>
                  </Marker>
                ))}
              </Map>
            )}
            <button onClick={centerToUserLocation} className="absolute bottom-4 right-4 bg-slate-800/90 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-slate-700 transition-colors flex items-center gap-2 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              My Location
            </button>
          </div>

          <div className="lg:w-[35%] h-[500px] overflow-y-auto custom-scrollbar pr-2">
            {lawyers.map((lawyer) => (
              <motion.div key={lawyer.id} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} whileHover={{ scale: 1.02 }} className={`p-4 rounded-xl mb-3 cursor-pointer transition-all ${selectedLawyer?.id === lawyer.id ? "bg-[#B8860B]/20 border-[#DAA520]" : "bg-slate-800/50 border-[#B8860B]/20"} border`} onClick={() => handleLawyerClick(lawyer)}>
                <div className="flex items-center gap-4">
                  <Image src={lawyer.image} alt={lawyer.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#B8860B]" fill sizes="100vw" />
                  <div>
                    <h3 className="text-white font-semibold text-lg">{lawyer.name}</h3>
                    <p className="text-[#DAA520] text-sm mb-2">{lawyer.specialty}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400">★</span>
                      <span className="text-white/80 text-sm">{lawyer.rating}</span>
                      <span className="text-white/40">•</span>
                      <span className="text-white/80 text-sm">{lawyer.distance}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
