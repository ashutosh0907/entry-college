/**
 * Central place for brand content and editable contact details.
 * Replace the placeholder values below with your own information.
 */
export const site = {
  brand: {
    name: 'EntryCollege',
    descriptor: 'Education Consultancy',
    tagline: "Guidance for what's next.",
  },

  nav: [
    { label: 'Home', id: 'home' },
    { label: 'About Us', id: 'about' },
    { label: 'Our Services', id: 'services' },
    { label: 'Why Choose Us', id: 'why-us' },
    { label: 'Contact', id: 'contact' },
  ],

  contact: {
    // Placeholder details — update these before going live.
    phone: '+91 98765 43210',
    phoneHref: 'tel:+919876543210',
    email: 'hello@entrycollege.example',
    emailHref: 'mailto:hello@entrycollege.example',
    addressLines: ['Level 2, Knowledge Square', 'MG Road, Bengaluru, Karnataka 560001'],
    address: 'Level 2, Knowledge Square, MG Road, Bengaluru, Karnataka 560001',
    hours: 'Monday – Saturday · 9:30 AM – 6:30 PM',
    // Swap this query for your own office location at maps.google.com.
    mapQuery: 'MG Road, Bengaluru, Karnataka 560001',
    mapEmbed:
      'https://www.google.com/maps?q=MG+Road,+Bengaluru,+Karnataka+560001&output=embed',
    mapLink:
      'https://www.google.com/maps/search/?api=1&query=MG+Road,+Bengaluru,+Karnataka+560001',
  },

  social: [
    { label: 'Instagram', icon: 'instagram' },
    { label: 'LinkedIn', icon: 'linkedin' },
    { label: 'YouTube', icon: 'youtube' },
  ],

  formOptions: ['Engineering', 'Management', 'BCA / BBA'],
};
