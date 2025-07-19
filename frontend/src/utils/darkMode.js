// Dark mode utility functions for persistence across pages

export const getDarkMode = () => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('darkMode') === 'true';
};

export const setDarkMode = (isDark) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('darkMode', isDark.toString());
  
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export const initializeDarkMode = () => {
  const isDark = getDarkMode();
  setDarkMode(isDark);
  return isDark;
};