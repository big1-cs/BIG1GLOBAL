import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type Lenis from "lenis";

export type ThemeName = "dark" | "day";

type AppStateValue = {
  theme: ThemeName;
  toggleTheme: () => void;
  lenis: Lenis | null;
  setLenis: (lenis: Lenis | null) => void;
  mandateOpen: boolean;
  setMandateOpen: (open: boolean) => void;
  revealed: boolean;
  setRevealed: (revealed: boolean) => void;
};

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>("dark");
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [mandateOpen, setMandateOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "day" : "dark"));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "day") root.dataset.theme = "day";
    else delete root.dataset.theme;
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.mandate = mandateOpen ? "open" : "closed";
  }, [mandateOpen]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      lenis,
      setLenis,
      mandateOpen,
      setMandateOpen,
      revealed,
      setRevealed,
    }),
    [theme, toggleTheme, lenis, mandateOpen, revealed],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const value = useContext(AppStateContext);
  if (!value) throw new Error("useAppState must be used within AppStateProvider");
  return value;
}
