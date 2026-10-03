import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Diagnosis from '@/components/Diagnosis';
import Ecosystem from '@/components/Ecosystem';
import BrandsGrid from '@/components/BrandsGrid';
import BusinessModel from '@/components/BusinessModel';
import Roadmap from '@/components/Roadmap';
import InvestorForm from '@/components/InvestorForm';
import Footer from '@/components/Footer';

export default function Home() {
  return <><Navbar /><main id="contenido"><Hero /><Diagnosis /><Ecosystem /><BrandsGrid /><BusinessModel /><Roadmap /><InvestorForm /></main><Footer /></>;
}
