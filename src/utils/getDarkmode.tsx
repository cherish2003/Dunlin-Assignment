import { useState, useEffect } from "react";

export default function DarkModeChecker() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      const darkModeEnabled =
        document.documentElement.classList.contains("dark");
      setIsDarkMode(darkModeEnabled);
    };

    checkDarkMode(); 

    // Add event listener to monitor changes to the dark mode class
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Cleanup function to disconnect the observer when the component unmounts
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <p>The current mode is: {isDarkMode ? "Dark" : "Light"}</p>
    </div>
  );
}
