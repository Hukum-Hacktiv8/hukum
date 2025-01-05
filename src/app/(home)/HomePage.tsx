import HeroSection from "./HeroSection"
import StatsSection from "./StatsSection"
import ServicesSection from "./ServicesSection"
import LegalTipsSection from "./LegalTipsSection"
import SubscriptionSection from "./SubscriptionSection"
import Footer from "@/components/Footer"

export default function Home() {
    return (
        <>
            <main>
                <HeroSection />
                <div className="w-full border-t border-slate-800" />
                <StatsSection />
                <div className="w-full border-t border-slate-800" />
                <ServicesSection />
                <div className="w-full border-t border-slate-800" />
                <LegalTipsSection />
                <div className="w-full border-t border-slate-800" />
                <SubscriptionSection />
                <div className="w-full border-t border-slate-800" />
            </main>

            <footer>
                <Footer />
            </footer>
        </>
    )
}