import React from 'react';
import { ConstellationHero } from './ConstellationHero';

interface FeaturedHeroCardProps {
  onViewCaseStudy?: (slug: string) => void;
}

export const FeaturedHeroCard: React.FC<FeaturedHeroCardProps> = ({
  onViewCaseStudy,
}) => {
  return <ConstellationHero onViewCaseStudy={onViewCaseStudy} />;
};
