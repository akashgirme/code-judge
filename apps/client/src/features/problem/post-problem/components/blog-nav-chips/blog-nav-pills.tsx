import React, { useState } from 'react';

import { Chip, PillsContainer } from '@skill-street-ui/core-design';

type NavChip = { content: string; id: string };

interface BlogNavPillsProps {
  navPills: Array<NavChip>;
}

const scrollToElementWithOffset = (elementId: string) => {
  const element = document.getElementById(elementId);
  const topBarHeight = 180;
  if (!element) return;
  const position = element.offsetTop - topBarHeight;
  window.scrollTo({
    top: position,
    behavior: 'smooth',
  });
};

export const BlogNavPills: React.FC<BlogNavPillsProps> = ({ navPills }) => {
  const [selectedNavPill, setSelectedNavPill] = useState<NavChip | null>(
    navPills[0] ?? null
  );

  const handleClick = (pill: NavChip) => {
    setSelectedNavPill(pill);
    scrollToElementWithOffset(pill.id);
  };
  // TODO: Adjust Position for mobile devices

  return (
    <PillsContainer>
      {navPills.map((pill, idx) => (
        // TODO: Use Fragment tags to share URLs
        <Chip
          key={pill.id || `blog-nav-pill${idx}`}
          onClick={() => handleClick(pill)}
          variant={
            selectedNavPill?.content === pill.content
              ? 'primary-btn'
              : 'secondary-link'
          }
          state={
            selectedNavPill?.content === pill.content ? 'active' : undefined
          }
          className="whitespace-nowrap"
          size={'lg'}
        >
          {pill.content}
        </Chip>
        // </a>
      ))}
    </PillsContainer>
  );
};
