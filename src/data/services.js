import engineeringImage from '../assets/images/service-engineering.jpg';
import managementImage from '../assets/images/service-management.jpg';
import bcaImage from '../assets/images/service-bca.jpg';

export const services = [
  {
    id: 'engineering',
    number: '01',
    title: 'Engineering',
    icon: 'engineering',
    accent: '#356ae6',
    accentSoft: '#ecf1fe',
    image: engineeringImage,
    imageAlt: 'Engineering student working with technology in a modern laboratory',
    description:
      'Turn your passion for technology and innovation into a rewarding career. Get expert guidance to find the right engineering college, branch, and admission pathway.',
    highlights: [
      'B.Tech and Engineering Admissions',
      'College & Branch Selection',
      'JEE and State Entrance Guidance',
      'Placement and Career Insights',
      'Admission Process Assistance',
    ],
    cta: 'Explore Engineering',
  },
  {
    id: 'management',
    number: '02',
    title: 'Management',
    icon: 'management',
    accent: '#d18a26',
    accentSoft: '#fdf3e4',
    image: managementImage,
    imageAlt: 'Business students collaborating around a table in a modern workspace',
    description:
      'Build the foundation for your leadership journey. Discover the right management programs and institutions that align with your career ambitions.',
    highlights: [
      'MBA and Management Admissions',
      'BBA and Business Programs',
      'College Shortlisting',
      'Entrance Exam Guidance',
      'Career and Placement Insights',
    ],
    cta: 'Explore Management',
  },
  {
    id: 'bca-bba',
    number: '03',
    title: 'BCA / BBA',
    icon: 'undergraduate',
    accent: '#2b8a7e',
    accentSoft: '#eaf6f3',
    image: bcaImage,
    imageAlt: 'College students learning together with laptops in a bright study space',
    description:
      'Start building your future in technology or business with the right undergraduate program. We help you choose institutions and courses that match your interests and goals.',
    highlights: [
      'BCA and BBA Admissions',
      'College Selection Guidance',
      'Course and Specialisation Advice',
      'Admission Documentation',
      'Career Pathway Guidance',
    ],
    cta: 'Explore BCA / BBA',
  },
];
