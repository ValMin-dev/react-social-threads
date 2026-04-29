import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { NextUIProvider } from "@nextui-org/react"
import App from "./app/App"
import { store } from "./app/store"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { Auth } from "./pages/auth"
import { Layout } from "./components/layout"
import { Posts } from "./pages/posts"
import { CurrentPost } from "./pages/current-post"
import { UserProfile } from "./pages/user-profile"
import { Followers } from "./pages/followers"
import { Following } from "./pages/following"
import { AuthGuard } from "./features/user/authGuard"

// Здесь описаны все страницы и пути приложения.
const router = createBrowserRouter([
  { path: "/auth", element: <Auth /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Posts /> },
      { path: "posts/:id", element: <CurrentPost /> },
      { path: "users/:id", element: <UserProfile /> },
      { path: "followers", element: <Followers /> },
      { path: "following", element: <Following /> },
    ],
  },
])

// Здесь React подключает всё приложение к div#root в index.html.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <ThemeProvider>
          <AuthGuard>
            <RouterProvider router={router} />
          </AuthGuard>
        </ThemeProvider>
      </NextUIProvider>
    </Provider>
  </React.StrictMode>,
)
