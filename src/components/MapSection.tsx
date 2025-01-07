// import { Lawyer } from "@/app/(booking)/booking/page";
// import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
// import { useRef, useState } from "react";

// const mapContainerStyle = {
//   width: "100%",
//   height: "500px",
//   borderRadius: "1rem",
// };

// // Posisi center di Jakarta
// const center = {
//   lat: -6.2088,
//   lng: 106.8456,
// };

// const mapOptions = {
//   disableDefaultUI: true,
//   zoomControl: true,
//   styles: [
//     {
//       featureType: "all",
//       elementType: "labels.text.fill",
//       stylers: [{ color: "#ffffff" }],
//     },
//     {
//       featureType: "all",
//       elementType: "labels.text.stroke",
//       stylers: [{ color: "#000000" }, { lightness: 13 }],
//     },
//     {
//       featureType: "administrative",
//       elementType: "geometry.fill",
//       stylers: [{ color: "#000000" }],
//     },
//     {
//       featureType: "landscape",
//       elementType: "all",
//       stylers: [{ color: "#08304b" }],
//     },
//     {
//       featureType: "poi",
//       elementType: "geometry",
//       stylers: [{ color: "#0c4152" }, { lightness: 5 }],
//     },
//     {
//       featureType: "road.highway",
//       elementType: "geometry.fill",
//       stylers: [{ color: "#000000" }],
//     },
//     {
//       featureType: "water",
//       elementType: "all",
//       stylers: [{ color: "#021019" }],
//     },
//   ],
// };

// interface MapSectionProps {
//   lawyers: Lawyer[];
// }

// export default function MapSection({ lawyers }: MapSectionProps) {
//   const mapRef = useRef<google.maps.Map | null>(null);
//   const [selectedLawyer, setSelectedLawyer] = useState<string | null>(null);

//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "AIzaSyBl12-VCiWi3n1L5Z4QVG6O_oSVYfLMMLg",
//   });

//   // Fungsi utk scroll ke map & zoom ke lokasi lawyer
//   const scrollToLawyer = (lawyerId: string) => {
//     const lawyer = lawyers.find((l) => l._id === lawyerId);
//     if (!lawyer || !mapRef.current) return;

//     setSelectedLawyer(lawyerId);

//     // Scroll ke map
//     const mapElement = document.getElementById("lawyer-map");
//     mapElement?.scrollIntoView({ behavior: "smooth" });

//     // Zoom ke lokasi lawyer
//     if (lawyer.lat && lawyer.lng) {
//       mapRef.current.panTo({ lat: lawyer.lat, lng: lawyer.lng });
//     }
//     mapRef.current.setZoom(15);

//     // Reset selected lawyer after 3 seconds
//     setTimeout(() => setSelectedLawyer(null), 3000);
//   };

//   // Expose scrollToLawyer function
//   if (typeof window !== "undefined") {
//     (window as any).scrollToLawyer = scrollToLawyer;
//   }

//   if (!isLoaded)
//     return (
//       <div className="w-full h-[500px] bg-slate-800 rounded-xl animate-pulse">
//         <div className="h-full flex items-center justify-center text-gray-400">Loading Map...</div>
//       </div>
//     );

//   return (
//     <section className="py-12" id="lawyer-map">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-8">
//           <h2 className="text-2xl font-bold text-white mb-2">Lokasi Pengacara</h2>
//           <p className="text-gray-400">Temukan pengacara terdekat di lokasi Anda</p>
//         </div>

//         <div className="bg-slate-800 p-1 rounded-xl">
//           <GoogleMap
//             mapContainerStyle={mapContainerStyle}
//             center={center}
//             zoom={12}
//             options={mapOptions}
//             onLoad={(map) => {
//               mapRef.current = map;
//             }}
//           >
//             {lawyers.map((lawyer) => (
//               <MarkerF key={lawyer._id} position={{ lat: lawyer.lat, lng: lawyer.lng }} title={`${lawyer.name} - ${lawyer.location}`} animation={selectedLawyer === lawyer.id ? google.maps.Animation.BOUNCE : undefined} />
//             ))}
//           </GoogleMap>
//         </div>
//       </div>
//     </section>
//   );
// }
