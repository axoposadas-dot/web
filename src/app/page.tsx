import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Comparison } from "@/components/comparison";
import { Ecosystem } from "@/components/ecosystem";
import { Trace } from "@/components/trace";
import { Brands } from "@/components/brands";
import { BusinessModel, Roadmap } from "@/components/model-roadmap";
import { InvestorForm } from "@/components/investor-form";
import { Footer } from "@/components/footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="contenido">
        <Hero />
        <Comparison />
        <Ecosystem />
        <Trace />
        <Brands />
        <BusinessModel />
        <Roadmap />
        <InvestorForm />
      </main>
      <Footer />
    </>
  );
}
