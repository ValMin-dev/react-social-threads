import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { NextUIProvider } from "@nextui-org/react"
import App from "./app/App"
import { store } from "./app/store"
import "./index.css"
import { createBrowserRouter } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"

const router = createBrowserRouter([
  { path: "/auth", element: <div>Auth</div> },
  { path: "/", element: <div>Home</div> },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </NextUIProvider>
    </Provider>
  </React.StrictMode>,
)
