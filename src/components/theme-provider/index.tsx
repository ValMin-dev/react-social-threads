import React, { useState } from "react"

// Что умеет наш контекст темы.
type ThemeContextType = {
  theme: "light" | "dark"
  toggleTheme: () => void
}

// Контекст, через который компоненты узнают текущую тему.
export const ThemeContext = React.createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => null,
})

// Обёртка, которая хранит тему и даёт кнопку переключения светлой/тёмной темы.
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null
  const currentTheme = storedTheme ? storedTheme : "dark"

  const [theme, setTheme] = useState<"light" | "dark">(currentTheme)
  // Меняет тему и сохраняет её в localStorage.
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light"
      localStorage.setItem("theme", newTheme)
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      <main className={`${theme} text-foreground bg-background`}>
        {children}
      </main>
    </ThemeContext.Provider>
  )
}
