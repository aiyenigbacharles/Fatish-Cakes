/**
 * Delivery guidelines, lead times, and policies for FATISH CAKES
 */

export interface AbujaDeliveryArea {
  name: string;
  district: string;
  estimatedTransitTime: string;
}

export const abujaDeliveryAreas: AbujaDeliveryArea[] = [
  { name: "Gwarinpa", district: "Phase 3", estimatedTransitTime: "25-35 mins" },
  { name: "Wuse 1 & 2", district: "Phase 1", estimatedTransitTime: "20-30 mins" },
  { name: "Maitama", district: "Phase 1", estimatedTransitTime: "25-35 mins" },
  { name: "Asokoro", district: "Phase 1", estimatedTransitTime: "30-40 mins" },
  { name: "Garki 1 & 2", district: "Phase 1", estimatedTransitTime: "25-35 mins" },
  { name: "Jabi & Utako", district: "Phase 2", estimatedTransitTime: "20-30 mins" },
  { name: "Life Camp", district: "Phase 3", estimatedTransitTime: "25-35 mins" },
  { name: "Guzape", district: "Phase 1", estimatedTransitTime: "35-45 mins" },
  { name: "Katampe Extension", district: "Phase 2", estimatedTransitTime: "30-40 mins" },
  { name: "Kubwa", district: "Satellite Towns", estimatedTransitTime: "40-55 mins" },
  { name: "Dawaki & Dutse", district: "Satellite Towns", estimatedTransitTime: "35-45 mins" },
  { name: "Lugbe & Airport Road", district: "Airport Corridor", estimatedTransitTime: "35-50 mins" },
  { name: "Apo & Lokogoma", district: "Phase 2/3", estimatedTransitTime: "30-45 mins" },
  { name: "Karsana", district: "Phase 3", estimatedTransitTime: "30-40 mins" }
];

export const policies = {
  leadTimeHours: 48,
  leadTimeSummary: "All orders must be submitted at least 48 hours in advance of the required delivery or pickup time. This ensures our bakery can procure fresh ingredients, slow-bake the sponges, chill the fillings, and perform intricate decorating without rushing.",
  deliveryPolicy: "We deliver across all districts and satellite towns of Abuja, FCT. Deliveries are scheduled within a 2-hour delivery window. Our delivery riders are experienced in transporting delicate multi-tier celebration cakes with specialized cake stabilization equipment.",
  pickupPolicy: "Clients opting for pickup will receive our bakery studio address in Abuja upon order confirmation. Please ensure your vehicle has working air conditioning and a flat floorboard or boot space for safe transit.",
  paymentPolicy: "No card processing occurs on this website. When you submit your cart, your order details are sent to Fatish Cakes on WhatsApp. We confirm availability and share verified bank details. A 70% deposit secures your date, with 30% balance payable prior to dispatch.",
  allergenNotice: "Our kitchen regularly processes wheat/gluten, dairy (milk, butter, cream cheese), eggs, tree nuts (almonds, walnuts), and peanuts. If you or your guests have severe allergies, please state them in the order notes so we can take extra sanitization precautions or advise accordingly.",
  cancellationPolicy: "Orders cancelled with more than 48 hours notice prior to delivery may reschedule their date without penalty. Cancellations within 24 hours of scheduled dispatch forfeit the commitment deposit due to perishable ingredients already prepared."
};
