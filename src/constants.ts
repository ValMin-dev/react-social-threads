// Адрес сервера. В разработке идём на localhost, в production здесь нужно поставить реальный URL.
export const BASE_URL =
  process.env.NODE_ENV === "production" ? "none" : "http://localhost:3000"
