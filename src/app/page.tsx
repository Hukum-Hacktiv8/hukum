import Carousel from "@/components/Carousel";
import KonsultasiCard from "@/components/KonsultasiCard";
import Navbar from "@/components/temp_Navbar";
import WaveDivider from "@/components/wave-divider";
import Footer from "@/components/temp_Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Carousel />
      <KonsultasiCard />
      <WaveDivider />
      <Footer />
    </>
  );
}
