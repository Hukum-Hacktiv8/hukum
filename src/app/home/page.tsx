import Carousel from "@/components/Carousel";
import KonsultasiCard from "@/components/KonsultasiCard";
import TipsCard from "@/components/TipsCard";
import WaveDivider from "@/components/wave-divider";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1a4b69] to-[#1a3f69]">
      <section className="relative h-screen flex items-center justify-center text-white px-4">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://res.cloudinary.com/dngm0voif/video/upload/v1735297045/Skyscraper_Building_City_Urban_4K_Free_HD_Stock_Footage_-_No_Copyright_Skyscraper_Building_sky_xufzgo.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="relative z-20 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-lora mb-6 animate-fade-in">
            A Lawyer Dedicated to Protecting The Rights of All
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Experienced and knowledgeable lawyer offering top world-class
            representation and advocacy services.
          </p>
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 text-lg transform hover:scale-105">
            Schedule Consultation
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-lora text-white text-center mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <KonsultasiCard />
            <KonsultasiCard />
            <KonsultasiCard />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-lora text-white text-center mb-12">
            What Our Clients Say
          </h2>
          <Carousel />
        </div>
      </section>

      {/* Legal Tips Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-lora text-white text-center mb-12">
            Latest Legal Tips
          </h2>
          <TipsCard />
        </div>
      </section>

      <WaveDivider />
    </main>
  );
}
