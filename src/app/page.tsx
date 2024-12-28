import Carousel from "@/components/Carousel";
import KonsultasiCard from "@/components/KonsultasiCard";
import Navbar from "@/components/Navbar";
import WaveDivider from "@/components/wave-divider";
import Footer from "@/components/footer";

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
