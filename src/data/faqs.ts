/**
 * Frequently Asked Questions for FATISH CAKES
 */

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'ordering' | 'delivery' | 'custom' | 'allergies';
}

export const faqs: FAQ[] = [
  {
    id: "faq-lead-time",
    question: "What is the minimum lead time for placing an order?",
    answer: "We require a minimum lead time of 48 hours for standard celebration cakes, small chops platters, and parfaits. For large multi-tiered wedding cakes or elaborate custom themes, we recommend booking at least 5 to 7 days in advance to secure your event date on our baking calendar.",
    category: "ordering"
  },
  {
    id: "faq-order-flow",
    question: "How do I place and confirm my order?",
    answer: "Simply choose your desired treats, cake size, sponge flavour, filling, and custom cake inscription directly on our website. Once you click 'Send Order on WhatsApp', your complete order is converted into a structured message sent directly to Fatish Cakes on WhatsApp (+234 806 032 0401). We review the details, confirm delivery logistics, and send bank transfer account information.",
    category: "ordering"
  },
  {
    id: "faq-delivery-areas",
    question: "Which areas in Abuja do you deliver to?",
    answer: "We deliver across the entire Federal Capital Territory (FCT) of Abuja, including Gwarinpa, Maitama, Wuse 1 & 2, Garki, Jabi, Utako, Asokoro, Guzape, Life Camp, Kubwa, Lugbe, Dawaki, Katampe, and surrounding environs. Delivery fees depend on distance and are confirmed via WhatsApp.",
    category: "delivery"
  },
  {
    id: "faq-pickup",
    question: "Can I pick up my order in person?",
    answer: "Yes, self-pickup is available! When filling out your order, select 'Pickup' as your fulfilment method. Our exact bakery studio pickup location in Abuja will be shared with you immediately upon WhatsApp order confirmation.",
    category: "delivery"
  },
  {
    id: "faq-custom-designs",
    question: "Can I request a custom cake design or send an inspiration picture?",
    answer: "Absolutely! We specialize in bespoke cakes for weddings, milestones, children's cartoon themes, and corporate anniversaries. You can submit our Custom Order form or send your Pinterest/Instagram inspiration photos directly in our WhatsApp chat after placing your inquiry.",
    category: "custom"
  },
  {
    id: "faq-payment",
    question: "How do payments work? Is there an online card gateway?",
    answer: "To ensure personalized service and accurate delivery coordination, we do not charge your debit card automatically on the website. Instead, payment is arranged directly with Fatish Cakes via secure Nigerian bank transfer once your order details and date availability are confirmed on WhatsApp. A 70% commitment deposit is typically required to lock in your date.",
    category: "ordering"
  },
  {
    id: "faq-allergies",
    question: "How do you handle food allergies and dietary requirements?",
    answer: "Your safety is paramount. Our checkout form includes a dedicated Allergen & Dietary notes field. Please inform us of any nut, dairy, gluten, egg, or sensitivity restrictions. While we take rigorous cross-contamination precautions, our kitchen handles dairy, wheat, eggs, and nuts.",
    category: "allergies"
  },
  {
    id: "faq-changes",
    question: "Can I modify or cancel my order after placing it?",
    answer: "Any adjustments to design, flavor, or inscription must be requested via WhatsApp at least 36 hours prior to scheduled dispatch. Because all cakes are baked fresh to order, cancellations made within 24 hours of delivery may forfeit the deposit. Please discuss any urgent changes directly with us.",
    category: "ordering"
  }
];
