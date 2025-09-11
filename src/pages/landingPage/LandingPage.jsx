import FinalCTA from "./FinalCTA";
import Footer from "./Footer";
import Hero from "./Hero";
import Nav from "./Nav";
import PricingTeaser from "./PricingTeaser";
import ProductShowcase from "./ProductShowcase";
import SocialProof from "./SocialProof";
import ValueProposition from "./ValueProposition";

function LandingPage() {
  return (
    <div className="from-background via-background to-accent/60 min-h-screen bg-gradient-to-br">
      <Nav />
      <main>
        <Hero />
        <ValueProposition />
        <ProductShowcase />
        <SocialProof />
        <PricingTeaser />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
