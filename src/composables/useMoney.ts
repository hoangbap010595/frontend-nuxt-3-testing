export const useMoney = () => {
  const formatCents = (cents: number) =>
    new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(
      Math.round(cents / 100)
    )
  return { formatCents }
}
