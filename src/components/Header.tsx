// src/components/Header.tsx
import React from 'react';
import { Command } from 'lucide-react';

const Header = () => {
  const navLinks = ['About', 'Skills', 'Projects', 'Connect'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#home" className="text-xl font-bold text-accent-light">
          AT
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-dark-text-secondary hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-md hover:bg-dark-card">
            <Command size={20} />
          </button>
          {/* <button className="p-2 rounded-md hover:bg-dark-card">
            <Moon size={20} />
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;