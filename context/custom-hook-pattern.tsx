import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type Theme = "auto" | "light" | "dark";

type ThemeContext = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};
const ThemeContext = createContext<ThemeContext | null>(null);

type ThemeContextProviderProps = {
  children: ReactNode;
};
export default function ThemeContextProvider({
  children,
}): ThemeContextProviderProps {
  const [theme, setTheme] = useState<ThemeContext["theme"]>("auto");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context == null) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
    return context;
  }
}
