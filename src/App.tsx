import { useCallback, useEffect, useRef, useState } from "react";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import StudioStatement from "./components/StudioStatement";
import SelectedWork from "./components/SelectedWork";
import Capabilities from "./components/Capabilities";
import Blog from "./components/Blog";
import FAQ from "./components/FAQ";
import ParallaxCallout from "./components/ParallaxCallout";
import ProjectModal from "./components/ProjectModal";
import CaseStudyModal from "./components/CaseStudyModal";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import LegalPage from "./components/LegalPage";
import ArticleModal from "./components/ArticleModal";
import ArticlePage from "./components/ArticlePage";
import { LEGAL_DOCUMENTS } from "./data/legal";
import type { Project } from "./data/projects";
import { findPost, postPath, type Post } from "./data/posts";

function HomePage() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const baseTitle = useRef("");

  // Articolul se deschide în modal, dar adresa din bară devine /blog/<slug> (link de partajat).
  const openPost = useCallback((post: Post) => {
    window.history.pushState({ post: true }, "", postPath(post));
    setActivePost(post);
  }, []);

  const closePost = useCallback(() => {
    if (window.history.state?.post) {
      window.history.back();
    } else {
      window.history.replaceState(null, "", "/");
      setActivePost(null);
    }
  }, []);

  useEffect(() => {
    baseTitle.current = document.title;
    const onPop = () => setActivePost(findPost(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    document.title = activePost ? `${activePost.title} — ZECRO` : baseTitle.current || document.title;
  }, [activePost]);

  return (
    <div className="relative min-h-screen w-full bg-obsidian">
      <CustomCursor />
      <Navbar onOpenModal={() => setInquiryOpen(true)} />

      <main>
        <HeroSection />
        <StudioStatement />
        <SelectedWork onOpen={setActiveProject} />
        <Capabilities />
        <Blog onOpen={openPost} />
        <FAQ />
        <ParallaxCallout onOpenModal={() => setInquiryOpen(true)} />
      </main>

      <Footer />
      <BackToTop />

      <ProjectModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
      <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
      <ArticleModal post={activePost} onClose={closePost} />
    </div>
  );
}

const LEGAL_BY_PATH = Object.fromEntries(LEGAL_DOCUMENTS.map((d) => [d.path, d]));

export default function App({ path: initialPath }: { path?: string }) {
  const path = (initialPath ?? window.location.pathname)
    .replace(/\.html$/, "")
    .replace(/\/+$/, "") || "/";
  const legalDoc = LEGAL_BY_PATH[path];
  if (legalDoc) return <LegalPage doc={legalDoc} />;
  const post = findPost(path);
  return post ? <ArticlePage post={post} /> : <HomePage />;
}
