export function formatCurrencyString(value: string) {
  const onlyNumbers = Number(value.replaceAll(/\D/g, "")) / 100

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(onlyNumbers);
}