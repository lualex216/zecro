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
import type { Project } from "./data/projects";

export default function App() {
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

      <ProjectModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
      <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}
