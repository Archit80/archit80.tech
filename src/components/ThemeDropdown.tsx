"use client";

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemePresets } from '@/context/ThemeContext';

interface ThemeDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeDropdown: React.FC<ThemeDropdownProps> = ({ isOpen, onClose }) => {
  const { currentTheme, setTheme, themes } = useThemePresets();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleThemeSelect = (themeName: string) => {
    setTheme(themeName);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-12 right-0 bg-neutral-900 border border-neutral-700 rounded-lg p-3 shadow-xl z-50 min-w-64"
        >
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-neutral-200 mb-1">Theme Presets</h3>
            <p className="text-xs text-neutral-400">Choose your preferred color theme</p>
          </div>
          
          <div className="space-y-1">
            {themes.map((theme) => (
              <motion.button
                key={theme.name}
                onClick={() => handleThemeSelect(theme.name)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-colors ${
                  currentTheme === theme.name 
                    ? 'bg-neutral-800 border border-accent' 
                    : 'hover:bg-neutral-800 border border-transparent'
                }`}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full border border-neutral-600"
                    style={{ backgroundColor: theme.accent }}
                  />
                  <div>
                    <div className="text-sm font-medium text-neutral-200">{theme.displayName}</div>
                    <div className="text-xs text-neutral-400">{theme.description}</div>
                  </div>
                </div>
                {currentTheme === theme.name && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 rounded-full bg-accent"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
