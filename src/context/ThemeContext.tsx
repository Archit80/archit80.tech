"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Theme {
  name: string;
  displayName: string;
  accent: string;
  description: string;
}

export const themes: Theme[] = [
  {
    name: 'default',
    displayName: 'Default',
    accent: '#e0e0e0',
    description: 'Your current'
  },
  {
    name: 'emerald',
    displayName: 'CyberPunk',
    accent: '#ffd500',
    description: 'Futuristic world'
  },
  {
    name: 'fuchsia',
    displayName: 'Berry Blast',
    accent: '#ffa3c8',
    description: 'Bold & creative'
  },
  {
    name: 'terminal',
    displayName: 'Terminal',
    accent: '#2fd943',
    description: 'Matrix vibes'
  }
];

interface ThemeContextType {
  currentTheme: string;
  setTheme: (theme: string) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: 'default',
  setTheme: () => {},
  themes: themes
});

export const useThemePresets = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemePresets must be used within ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemePresetsProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('default');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-preset');
    if (savedTheme && themes.find(t => t.name === savedTheme)) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Apply theme to document and save to localStorage
  useEffect(() => {
    const theme = themes.find(t => t.name === currentTheme);
    if (theme) {
      document.documentElement.style.setProperty('--accent-color', theme.accent);
      document.documentElement.className = `theme-${currentTheme}`;
      localStorage.setItem('theme-preset', currentTheme);
    }
  }, [currentTheme]);

  const setTheme = (themeName: string) => {
    if (themes.find(t => t.name === themeName)) {
      setCurrentTheme(themeName);
    }
  };

  const value = {
    currentTheme,
    setTheme,
    themes
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
