// Проверяет, есть ли у ошибки поле error в привычном для нас формате.
export function hasErrorField(
  err: unknown,
): err is { data: { error: string } } {
  return (
    typeof err === "object" &&
    err !== null &&
    "data" in err &&
    typeof err.data === "object" &&
    err.data !== null &&
    "error" in err.data &&
    "error" in err.data
  )
}
