import React, { useState, useEffect } from 'react';
import { SkipLink } from './components/ui/SkipLink';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { FeaturedHeroCard } from './components/sections/FeaturedHeroCard';
import { WorksGrid } from './components/sections/WorksGrid';
import { ProvenanceSection } from './components/sections/ProvenanceSection';
import { Footer } from './components/layout/Footer';
import { ContactModal } from './components/ui/ContactModal';
import { CaseStudyDetail } from './pages/CaseStudyDetail';
import { CASE_STUDIES } from './data/projects';

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>(window.location.pathname);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update dynamic document title based on route
  useEffect(() => {
    if (currentRoute.startsWith('/work/')) {
      const slug = currentRoute.replace('/work/', '');
      const project = CASE_STUDIES[slug];
      document.title = project
        ? `${project.title} — Nawaz Sharif`
        : 'Case Study — Nawaz Sharif';
    } else {
      document.title = 'Nawaz Sharif — Backend & Systems Engineer';
    }
  }, [currentRoute]);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavbarNavigate = (sectionId: string) => {
    if (currentRoute !== '/') {
      window.history.pushState({}, '', '/');
      setCurrentRoute('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isCaseStudyRoute = currentRoute.startsWith('/work/');
  const caseStudySlug = isCaseStudyRoute ? currentRoute.replace('/work/', '') : '';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SkipLink targetId="main-content" />
      <Navbar
        onNavigate={handleNavbarNavigate}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <main id="main-content" tabIndex={-1} style={{ flex: 1, outline: 'none' }} className="page-enter" key={currentRoute}>
        {isCaseStudyRoute ? (
          <CaseStudyDetail
            slug={caseStudySlug}
            onBackToIndex={() => navigateTo('/')}
            onNavigateCaseStudy={(slug) => navigateTo(`/work/${slug}`)}
          />
        ) : (
          <>
            {/* Section 3: Asymmetric Hero */}
            <HeroSection
              onScaleClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('provenance');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Section 4: Featured Highlight (Flagship Case Study) */}
            <FeaturedHeroCard
              onViewCaseStudy={(slug) => navigateTo(`/work/${slug}`)}
            />

            {/* Section 5: Works Grid (3 Cards) */}
            <WorksGrid
              onViewCaseStudy={(slug) => navigateTo(`/work/${slug}`)}
            />

            {/* Section 6: Work Experience (Provenance) */}
            <ProvenanceSection />
          </>
        )}
      </main>

      {/* Minimal Slate Dark Footer */}
      <Footer />

      {/* Contact Form Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
};

export default App;
