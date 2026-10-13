import { useState } from "react";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import StudioStatement from "./components/StudioStatement";
import SelectedWork from "./components/SelectedWork";
import Capabilities from "./components/Capabilities";
import FAQ from "./components/FAQ";
import ParallaxCallout from "./components/ParallaxCallout";
import ProjectModal from "./components/ProjectModal";
import CaseStudyModal from "./components/CaseStudyModal";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import LegalPage from "./components/LegalPage";
import { LEGAL_DOCUMENTS } from "./data/legal";
import type { Project } from "./data/projects";

function HomePage() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <div className="relative min-h-screen w-full bg-obsidian">
      <CustomCursor />
      <Navbar onOpenModal={() => setInquiryOpen(true)} />

      <main>
        <HeroSection />
        <StudioStatement />
        <SelectedWork onOpen={setActiveProject} />
        <Capabilities />
        <FAQ />
        <ParallaxCallout onOpenModal={() => setInquiryOpen(true)} />
      </main>

      <Footer />
      <BackToTop />

      <ProjectModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
      <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}

const LEGAL_BY_PATH = Object.fromEntries(LEGAL_DOCUMENTS.map((d) => [d.path, d]));

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  const legalDoc = LEGAL_BY_PATH[path];
  return legalDoc ? <LegalPage doc={legalDoc} /> : <HomePage />;
}
