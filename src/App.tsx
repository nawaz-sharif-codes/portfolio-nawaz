import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { SkipLink } from './components/ui/SkipLink';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { FeaturedHeroCard } from './components/sections/FeaturedHeroCard';
import { WorksGrid } from './components/sections/WorksGrid';
import { ProvenanceSection } from './components/sections/ProvenanceSection';
import { Footer } from './components/layout/Footer';
import { CaseStudyDetail } from './pages/CaseStudyDetail';
import { ContactPage } from './pages/ContactPage';
import { CASE_STUDIES } from './data/projects';

// Scroll restoration and hash anchor handling across route changes
const ScrollManager: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
};

// Home View
const HomePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Nawaz Sharif — Backend & Systems Engineer';
  }, []);

  return (
    <>
      <HeroSection
        onScaleClick={(e) => {
          e.preventDefault();
          const el = document.getElementById('provenance');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />
      <FeaturedHeroCard
        onViewCaseStudy={(slug) => navigate(`/work/${slug}`)}
      />
      <WorksGrid
        onViewCaseStudy={(slug) => navigate(`/work/${slug}`)}
      />
      <ProvenanceSection />
    </>
  );
};

// Case Study View with dynamic route params and SEO title updates
const CaseStudyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const currentSlug = slug || 'identity-migration';
  const project = CASE_STUDIES[currentSlug];

  useEffect(() => {
    if (project) {
      document.title = `${project.title} — Nawaz Sharif`;
    } else {
      document.title = 'Case Study — Nawaz Sharif';
    }
  }, [project]);

  return (
    <CaseStudyDetail
      slug={currentSlug}
      onBackToIndex={() => navigate('/')}
      onNavigateCaseStudy={(nextSlug) => navigate(`/work/${nextSlug}`)}
    />
  );
};

// Dedicated Contact Page View
const ContactPageView: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Contact — Nawaz Sharif';
  }, []);

  return <ContactPage onBackToIndex={() => navigate('/')} />;
};

export const App: React.FC = () => {
  const navigate = useNavigate();

  const handleNavbarNavigate = (sectionId: string) => {
    if (window.location.pathname !== '/') {
      navigate(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `/#${sectionId}`);
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollManager />
      <SkipLink targetId="main-content" />
      <Navbar
        onNavigate={handleNavbarNavigate}
        onOpenContact={() => navigate('/contact')}
      />

      <main id="main-content" tabIndex={-1} style={{ flex: 1, outline: 'none' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
          <Route path="/contact" element={<ContactPageView />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      {/* Minimal Slate Dark Footer */}
      <Footer />
    </div>
  );
};

export default App;
