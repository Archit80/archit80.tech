// src/components/SkillBadge.tsx
import React from 'react';

interface SkillBadgeProps {
  name: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ name }) => {
  return (
    <div className="bg-dark-card border border-gray-700 rounded-lg px-4 py-2 text-sm text-dark-text-secondary hover:text-white hover:border-accent transition-all duration-300 cursor-pointer">
      {name}
    </div>
  );
};

export default SkillBadge;