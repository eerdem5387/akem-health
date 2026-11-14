export const site = {
  name: "Akem Health",
  phone: "+90 500 000 00 00",
  phoneHref: "tel:+905000000000",
  whatsapp: "https://wa.me/905000000000",
  email: "info@akemhealth.com",
  address: "Levent Plaza B Block, No:45 Floor:12, Beşiktaş, Istanbul",
  coordinator: {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAsYZ6x_mSgBRTHGvyOzAE9dC8M-2175oiw4Z25WdsGorC_URjSD0wkJYcWT8d-fMA3D5A2wsfP58cVdIj3nn02bswhSlXzqNAlkDTlJ1C0DG-6bfW2sVO3Ha904vZA1pZHvgCu9BcFzQe0-_sAQ0qB_-DiSCfOAvalbLD45-j7TVATxXe-xE5kD1gi9n0sQlAEO_3_FGOnBqYmZX2Hgiz-it3-wrVcs-vkk6EWwjdL",
  },
  nav: [
    { href: "/treatments", key: "treatments" },
    { href: "/about", key: "about" },
    { href: "/hospitals", key: "hospitals" },
    { href: "/certificates", key: "certificates" },
    { href: "/vip-experience", key: "vipExperience" },
    { href: "/contact", key: "contact" },
  ],
  mobileNav: [
    { href: "/", key: "mobileHome", icon: "home" },
    { href: "/treatments", key: "mobileTreatments", icon: "medical_services" },
    { href: "/vip-experience", key: "mobileVip", icon: "hotel_class" },
    { href: "/contact", key: "mobileContact", icon: "chat", cta: true },
  ],
} as const;
