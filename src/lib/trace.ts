export type Logistics = "sumo" | "own";
export const traceSteps = [
  "Compra creada",
  "Pago validado",
  "Logística asignada",
  "En camino",
  "Entrega confirmada",
];
export function traceEvent(step: number, logistics: Logistics) {
  return [
    "order.created",
    "payment.confirmed",
    logistics === "sumo" ? "dispatch.sumo.assigned" : "dispatch.own.assigned",
    "delivery.location.updated",
    "delivery.completed",
  ][step];
}
export function canAdvance(step: number, payment: "approved" | "rejected") {
  return step < 4 && !(step === 0 && payment === "rejected");
}
