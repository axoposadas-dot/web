export function compareFees(sales: number, traditional: number, axo: number) {
  return {
    traditional: (sales * traditional) / 100,
    axo: (sales * axo) / 100,
    savings: (sales * (traditional - axo)) / 100,
  };
}
export const money = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
