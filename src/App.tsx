import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { SkipLink } from './components/ui/SkipLink';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { FeaturedHeroCard } from './components/sections/FeaturedHeroCard';
import { WorksGrid } from './components/sections/WorksGrid';
import { ProvenanceSection } from './components/sections/ProvenanceSection';
import { Footer } from './components/layout/Footer';
import { ContactModal } from './components/ui/ContactModal';
import { CaseStudyDetail } from './pages/CaseStudyDetail';
import { ArchitectureDeckSection } from './components/sections/ArchitectureDeckSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { CASE_STUDIES } from './data/projects';
import { updatePageSEO } from './utils/seo';

// Route section scroll coordinator matching editorial smooth motion
const SectionScrollSync: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/projects') {
      updatePageSEO({
        title: 'Projects',
        description: 'Selected production systems and distributed architectures engineered by Nawaz Sharif.',
        path: '/projects',
      });
      const el = document.getElementById('works');
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
    } else if (pathname === '/docs') {
      updatePageSEO({
        title: 'Architecture Decks & Docs',
        description: 'Visual system blueprints, interactive architecture decks, and distributed system documentation by Nawaz Sharif.',
        path: '/docs',
      });
      const el = document.getElementById('architecture-decks');
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
    } else if (pathname === '/experience') {
      updatePageSEO({
        title: 'Experience',
        description: 'Engineering career provenance and track record at DAZN and ENTAIN.',
        path: '/experience',
      });
      const el = document.getElementById('provenance');
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
    } else if (pathname === '/skills') {
      updatePageSEO({
        title: 'Skills',
        description: 'Technical provenance, backend engineering stack, distributed databases, cloud systems, and observability tooling.',
        path: '/skills',
      });
      const el = document.getElementById('skills');
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50);
    } else if (pathname === '/contact') {
      updatePageSEO({
        title: 'Contact',
        description: 'Get in touch with Nawaz Sharif for backend architecture, high-throughput systems, or engineering inquiries.',
        path: '/contact',
      });
    } else if (pathname === '/') {
      updatePageSEO({
        title: 'Backend & Systems Engineer',
        description: 'Software engineer with 5 years of experience architecting resilient, distributed systems for high-concurrency environments, delivering real-time streaming solutions at DAZN.',
        path: '/',
      });
      if (window.scrollY > 0) {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
      }
    }
  }, [pathname]);

  return null;
};

// Main Home Page Component rendering all core sections
const HomePageView: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeroSection
        onScaleClick={(e) => {
          e.preventDefault();
          navigate('/experience');
        }}
      />
      <FeaturedHeroCard
        onViewCaseStudy={(slug) => navigate(`/work/${slug}`)}
      />
      <WorksGrid
        onViewCaseStudy={(slug) => navigate(`/work/${slug}`)}
      />
      <ArchitectureDeckSection />
      <ProvenanceSection />
      <SkillsSection />
    </>
  );
};

// Case Study View Component
const CaseStudyPageView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const currentSlug = slug || 'identity-migration';
  const project = CASE_STUDIES[currentSlug];

  useEffect(() => {
    if (project) {
      updatePageSEO({
        title: project.title,
        description: `${project.subtitle} ${project.context}`,
        path: `/work/${project.slug}`,
      });
    } else {
      updatePageSEO({
        title: 'Case Study',
        description: 'Production system case study by Nawaz Sharif.',
        path: `/work/${currentSlug}`,
      });
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project, currentSlug]);

  return (
    <CaseStudyDetail
      slug={currentSlug}
      onBackToIndex={() => navigate('/')}
      onNavigateCaseStudy={(nextSlug) => navigate(`/work/${nextSlug}`)}
    />
  );
};

export const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  // Sync contact modal open state with /contact route
  useEffect(() => {
    if (location.pathname === '/contact') {
      setIsContactOpen(true);
    } else {
      setIsContactOpen(false);
    }
  }, [location.pathname]);

  const handleNavbarNavigate = (path: string) => {
    if (path === '/') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path === '/projects') {
      navigate('/projects');
      const el = document.getElementById('works');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (path === '/docs') {
      navigate('/docs');
      const el = document.getElementById('architecture-decks');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (path === '/experience') {
      navigate('/experience');
      const el = document.getElementById('provenance');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (path === '/skills') {
      navigate('/skills');
      const el = document.getElementById('skills');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (path === '/contact') {
      navigate('/contact');
    } else {
      navigate(path);
    }
  };

  const handleCloseContactModal = () => {
    setIsContactOpen(false);
    if (location.pathname === '/contact') {
      navigate('/');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SectionScrollSync />
      <SkipLink targetId="main-content" />
      <Navbar
        onNavigate={handleNavbarNavigate}
        onOpenContact={() => navigate('/contact')}
      />

      <main id="main-content" tabIndex={-1} style={{ flex: 1, outline: 'none' }}>
        <Routes>
          <Route path="/" element={<HomePageView />} />
          <Route path="/projects" element={<HomePageView />} />
          <Route path="/docs" element={<HomePageView />} />
          <Route path="/experience" element={<HomePageView />} />
          <Route path="/skills" element={<HomePageView />} />
          <Route path="/contact" element={<HomePageView />} />
          <Route path="/work/:slug" element={<CaseStudyPageView />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<HomePageView />} />
        </Routes>
      </main>

      {/* Minimal Slate Dark Footer */}
      <Footer />

      {/* Contact Form Modal (Popup design as requested) */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={handleCloseContactModal}
      />
    </div>
  );
};

export default App;
