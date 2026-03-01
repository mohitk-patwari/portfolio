import React from 'react';

interface SkillCategory {
  category: 'Frontend' | 'Backend' | 'Tools';
  skills: string[];
}

const skillsData: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST APIs'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitHub', 'Docker', 'VS Code', 'Webpack'],
  },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="scroll-mt-24 py-4" aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="mb-6 text-2xl font-semibold tracking-tight text-text md:text-3xl">
        Skills
      </h2>

      <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {skillsData.map((skillGroup) => (
          <li key={skillGroup.category}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
              {skillGroup.category}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {skillGroup.skills.map((skill) => (
                <li key={`${skillGroup.category}-${skill}`}>
                  <span className="inline-flex rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 transition-transform duration-200 ease-in-out hover:scale-[1.03] dark:bg-zinc-800 dark:text-zinc-200">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;
