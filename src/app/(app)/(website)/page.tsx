import ContactSection from "./(HomePageComponent)/ContactSection";
import FeaturesSection from "./(HomePageComponent)/FeaturesSection";
import HeroSection from "./(HomePageComponent)/HeroSection";
import PricingSection from "./(HomePageComponent)/PricingSection";
import TestimonialsSection from "./(HomePageComponent)/TestimonialsSection";

export default function Home() {
    return (
        <>
            <HeroSection />
            <FeaturesSection />
            <PricingSection />
            <TestimonialsSection />
            <ContactSection />
        </>
    );
}
