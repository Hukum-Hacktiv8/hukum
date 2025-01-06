import HeroSection from "@/app/(home)/HeroSection";
import StatsSection from "@/app/(home)/StatsSection";
import ServicesSection from "@/app/(home)/ServicesSection";
import LegalTipsSection from "@/app/(home)/LegalTipsSection";
import Footer from "@/components/Footer";
import SubscribePage from "@/components/SubscribePage";

  
export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <div className="h-24 bg-gradient-to-b from-slate-900/95 to-slate-900" />
        <StatsSection />
        <ServicesSection />
        <LegalTipsSection />
        {/* <SubscriptionSection /> */}
        <SubscribePage />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
