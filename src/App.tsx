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
import CaseStudyPage from "./components/CaseStudyPage";
import NotFoundPage from "./components/NotFoundPage";
import { LEGAL_DOCUMENTS } from "./data/legal";
import { findProject, projectPath, type Project } from "./data/projects";
import { findPost, postDocumentTitle, postPath, type Post } from "./data/posts";

function HomePage() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const baseTitle = useRef("");

  // Articolul / studiul de caz se deschide în modal, dar adresa din bară devine
  // /blog/<slug> sau /studii-de-caz/<id> (link de partajat, cu pagină proprie).
  const openPost = useCallback((post: Post) => {
    window.history.pushState({ modal: true }, "", postPath(post));
    setActivePost(post);
  }, []);

  const openProject = useCallback((project: Project) => {
    window.history.pushState({ modal: true }, "", projectPath(project));
    setActiveProject(project);
  }, []);

  const closeModal = useCallback(() => {
    if (window.history.state?.modal) {
      window.history.back();
    } else {
      window.history.replaceState(null, "", "/");
      setActivePost(null);
      setActiveProject(null);
    }
  }, []);

  useEffect(() => {
    baseTitle.current = document.title;
    const onPop = () => {
      const path = window.location.pathname;
      setActivePost(findPost(path));
      setActiveProject(findProject(path));
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    document.title = activePost
      ? postDocumentTitle(activePost)
      : activeProject
        ? `${activeProject.client} — studiu de caz ZECRO`
        : baseTitle.current || document.title;
  }, [activePost, activeProject]);

  return (
    <div className="relative min-h-screen w-full bg-obsidian">
      <CustomCursor />
      <Navbar onOpenModal={() => setInquiryOpen(true)} />

      <main>
        <HeroSection />
        <StudioStatement />
        <SelectedWork onOpen={openProject} />
        <Capabilities />
        <Blog onOpen={openPost} />
        <FAQ />
        <ParallaxCallout onOpenModal={() => setInquiryOpen(true)} />
      </main>

      <Footer />
      <BackToTop />

      <ProjectModal open={inquiryOpen} onClose={() => setInquiryOpen(false)} />
      <CaseStudyModal project={activeProject} onClose={closeModal} />
      <ArticleModal post={activePost} onClose={closeModal} />
    </div>
  );
}

const LEGAL_BY_PATH = Object.fromEntries(LEGAL_DOCUMENTS.map((d) => [d.path, d]));

export default function App({ path: initialPath }: { path?: string }) {
  const path = (initialPath ?? window.location.pathname)
    .replace(/\.html$/, "")
    .replace(/\/+$/, "") || "/";
  if (path === "/" || path === "/index") return <HomePage />;
  const legalDoc = LEGAL_BY_PATH[path];
  if (legalDoc) return <LegalPage doc={legalDoc} />;
  const post = findPost(path);
  if (post) return <ArticlePage post={post} />;
  const project = findProject(path);
  return project ? <CaseStudyPage project={project} /> : <NotFoundPage />;
}
