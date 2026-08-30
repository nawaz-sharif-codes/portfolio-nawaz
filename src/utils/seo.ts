interface SEOProps {
  title: string;
  description: string;
  path: string;
}

const DOMAIN = 'https://portfolio-nawaz-six.vercel.app';

export const updatePageSEO = ({ title, description, path }: SEOProps) => {
  const fullTitle = `${title} | Nawaz Sharif`;
  const canonicalUrl = `${DOMAIN}${path}`;

  // Update title
  document.title = fullTitle;

  // Helper to set or create meta tag
  const setMetaTag = (attrName: string, attrVal: string, content: string) => {
    let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Helper to set or create link tag
  const setLinkTag = (rel: string, href: string) => {
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  };

  // Standard Meta
  setMetaTag('name', 'title', fullTitle);
  setMetaTag('name', 'description', description);

  // Canonical URL
  setLinkTag('canonical', canonicalUrl);

  // Open Graph
  setMetaTag('property', 'og:title', fullTitle);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:url', canonicalUrl);
  setMetaTag('property', 'og:image', `${DOMAIN}/og-image.svg`);

  // Twitter Cards
  setMetaTag('property', 'twitter:title', fullTitle);
  setMetaTag('property', 'twitter:description', description);
  setMetaTag('property', 'twitter:url', canonicalUrl);
  setMetaTag('property', 'twitter:image', `${DOMAIN}/og-image.svg`);
};
