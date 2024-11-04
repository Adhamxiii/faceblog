"use client";

import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) return <div className={theme}>{children}</div>;

  return null;
}
