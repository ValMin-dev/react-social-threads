// Превращает дату из сервера в дату, понятную человеку в браузере.
export const formatToClientDate = (dateString?: string): string => {
  if (!dateString) return ""

  const date = new Date(dateString)
  return date.toLocaleDateString()
}
