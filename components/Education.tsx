import React from 'react';

interface EducationItem {
  degree: string;
  institute: string;
  year: string;
}

const educationData: EducationItem[] = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institute: 'University A',
    year: '2022',
  },
  {
    degree: 'Master of Science in Software Engineering',
    institute: 'University B',
    year: '2024',
  },
];

const Education: React.FC = () => {
  return (
    <section id="education" className="p-4 scroll-mt-24">
      <h2 className="mb-5 text-xl font-semibold tracking-tight text-text md:text-2xl">
        Education
      </h2>
      <ul className="space-y-3">
        {educationData.map((item) => (
          <li
            key={`${item.degree}-${item.year}`}
            className="rounded-xl border border-zinc-200/80 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300 md:text-base"
          >
            <span className="font-medium text-zinc-900 dark:text-zinc-100">{item.degree}</span>
            <span className="mx-2 text-zinc-400 dark:text-zinc-600">|</span>
            <span>{item.institute}</span>
            <span className="mx-2 text-zinc-400 dark:text-zinc-600">|</span>
            <span>{item.year}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Education;
