export type PersonalData = {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
};

export type SkillsData = {
  advanced: string[];
  proficient: string[];
  knowledgeOf: string[];
  experienceWith: string[];
};

export type WorkExperience = {
  title: string;
  company: string;
  duration: string;
  responsibilities: string[];
};

export type Project = {
  title: string;
  description: string;
  techStack: string[];
  link?: string;
};

export type EducationItem = {
  degree: string;
  specialization: string;
  institution: string;
  duration: string;
};

export type PortfolioData = {
  personal: PersonalData;
  summary: string[];
  skills: SkillsData;
  workHistory: WorkExperience[];
  projects: Project[];
  education: EducationItem[];
};

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Devendra More',
    title: 'Senior Front-end Developer',
    location: 'Charkop, Sector 4, Kandivali West, Mumbai, 400054',
    phone: '9768086490',
    email: 'devd.more@gmail.com',
  },
  summary: [
    'A driven senior software development professional with over nine years of experience in web development.',
    'Proven success in gathering requirements, defining scopes, and managing project timelines.',
    'Expertise includes project management, sprint planning, coding, and various types of testing, including responsive, cross-browser, and performance testing.',
    'Experienced in training and mentoring junior employees to build productive teams.',
  ],
  skills: {
    advanced: [
      'HTML/CSS3',
      'JavaScript',
      'React JS & Redux',
      'Material UI',
      'Bootstrap',
      'SCSS',
    ],
    proficient: [
      'Git',
      'Agile Scrum',
      'UI/UX Design Concepts',
      'VS Code',
      'Jira',
      'Figma',
      'Photoshop',
      'Illustrator',
      'Swagger',
      'Postman',
    ],
    knowledgeOf: ['Jenkins', 'SonarQube', 'UrbanCode', 'OpenShift'],
    experienceWith: ['ASP.Net', 'Python Django'],
  },
  workHistory: [
    {
      title: 'Senior Consultant',
      company: 'Virtusa Consulting Services Private Limited, Mumbai',
      duration: 'August 2021 – Present',
      responsibilities: [
        'Functioned as a front-end team lead, ensuring the delivery of high-quality code and managing project releases on schedule.',
        'Developed a banking application using React JS, Redux Toolkit, Material UI, and SCSS.',
        'Designed and developed web software, prototypes, and proofs of concept while collaborating with stakeholders to gather requirements and create technical specifications.',
        'Mentored junior engineers and resolved bugs during various stages of production.',
        'Collaborated with API, DB, and UX teams to address data and API-related issues.',
      ],
    },
    {
      title: 'Senior Developer',
      company: 'Code Raft Solutions Pvt. Ltd., Mumbai',
      duration: 'September 2018 – July 2021',
      responsibilities: [
        'Worked on a React JS and Redux e-commerce web application for peachmode.com.',
        'Recreated the entire payment section of peachmode.com, handling the payment process with JavaScript and integrating various payment modes through API responses.',
        'Optimized the existing JavaScript code on the site\'s address and payment pages for better performance.',
        'Created a gift card functionality for peachmode.com.',
        'Gained hands-on experience with Vue JS while working on the admin panel.',
      ],
    },
    {
      title: 'Senior Developer',
      company: 'Oh2Two Media, Mumbai',
      duration: 'November 2015 – August 2018',
      responsibilities: [
        'Managed front-end tasks, guided the team, and collaborated on projects to produce final products.',
        'Visualized and implemented website features and functionality.',
        'Developed websites from the ground up, ensuring cross-browser compatibility and improving page speed with Google PageSpeed Insights.',
      ],
    },
    {
      title: 'HTML Associate Developer',
      company: 'EveryMedia, Mumbai',
      duration: 'November 2013 – November 2015',
      responsibilities: [
        'Created responsive websites and developed UI for hybrid mobile applications.',
        'Designed Facebook application UIs, email templates, and signatures for various movies and clients.',
      ],
    },
  ],
  projects: [
    {
      title: 'Peachmode.com E-commerce',
      description: 'Worked on a large-scale e-commerce platform, focusing on payment integration and performance optimization.',
      techStack: ['React JS', 'Redux', 'JavaScript', 'E-commerce'],
      link: '#',
    },
    {
      title: 'HDFC Bank - Easykeys',
      description: 'Developed key features for an HDFC Bank digital product.',
      techStack: ['HTML/CSS', 'JavaScript', 'Banking'],
      link: '#',
    },
    {
      title: 'HDFC Bank - SmartUp',
      description: 'Contributed to the front-end development of the HDFC SmartUp solution.',
      techStack: ['HTML/CSS', 'JavaScript', 'Fintech'],
      link: '#',
    },
    {
      title: 'HDFC Bank - SmartHub',
      description: 'Worked on the user interface for HDFC\'s SmartHub platform.',
      techStack: ['UI/UX', 'JavaScript', 'Banking'],
      link: '#',
    },
    {
      title: 'HBL Global Animated Course',
      description: 'Created an engaging animated course for HBL Global employees, focusing on interactive UI.',
      techStack: ['Animation', 'UI Development', 'JavaScript'],
      link: '#',
    },
     {
      title: 'Banking Application',
      description: 'Led the front-end development of a modern banking application.',
      techStack: ['React JS', 'Redux Toolkit', 'Material UI', 'SCSS'],
      link: '#',
    },
  ],
  education: [
    {
      degree: 'Diploma in Software Engineering',
      specialization: 'Computer Programming and Software Development',
      institution: 'Aptech Computer Ltd - Andheri, Mumbai',
      duration: '2010 – 2013',
    },
    {
      degree: 'Bachelor of Commerce',
      specialization: 'Accounting Technology and Bookkeeping',
      institution: 'Mumbai University - Mumbai, Maharashtra',
      duration: '2008 – 2011',
    },
  ],
};
