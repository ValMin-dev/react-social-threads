export const formatToClientDate = (dateString?: string): string => {
  if (!dateString) return ""

  const date = new Date(dateString)
  return date.toLocaleDateString()
}
