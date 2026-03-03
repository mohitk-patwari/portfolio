import React from 'react';

interface EducationItem {
  degree: string;
  institute: string;
  year: string;
  gpa: string;
}

const educationData: EducationItem[] = [
  {
    degree: 'BE in Computer Science and Engineering',
    institute: ' Institute of Technology',
    year: '20XX',
    gpa: 'GPA XXX/10.00',
  },
  {
    degree: 'Snr. Secondary Schooling',
    institute: 'XXXX Public School',
    year: '20XX',
    gpa: 'Score XXX%',
  },
];

const Education: React.FC = () => {
  return (
    <section id="education" className="scroll-mt-24 py-4" aria-labelledby="education-heading">
      <h2
        id="education-heading"
        className="mb-6 text-2xl font-semibold tracking-tight text-text md:text-3xl"
      >
        Education
      </h2>

      <ul className="space-y-6 border-l border-zinc-200 pl-5 dark:border-zinc-800">
        {educationData.map((item) => (
          <li key={`${item.degree}-${item.year}`} className="flex items-start justify-between gap-4">
            <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{item.degree}</span>
              <span className="mx-2 text-zinc-400 dark:text-zinc-600">|</span>
              <span>{item.institute}</span>
              <span className="mx-2 text-zinc-400 dark:text-zinc-600">|</span>
              <span>{item.year}</span>
            </p>
            <span className="whitespace-nowrap rounded-full border border-zinc-200 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
              {item.gpa}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Education;
