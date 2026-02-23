import React from 'react';

interface SkillCategory {
    category: string;
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
        category: 'Tools & Platforms',
        skills: ['Git', 'GitHub', 'VS Code', 'Webpack', 'Docker'],
    },
    {
        category: 'Languages',
        skills: ['JavaScript', 'TypeScript', 'Python', 'SQL'],
    },
];

const Skills: React.FC = () => {
    return (
        <div className="p-4" id="skills">
            <h2 className="text-xl font-bold text-text mb-4">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillsData.map((skillGroup, index) => (
                    <div key={index} className="mb-4">
                        <h3 className="text-lg font-semibold text-text mb-2">{skillGroup.category}</h3>
                        <div className="flex flex-wrap gap-2">
                            {skillGroup.skills.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="bg-gray-800 text-text px-3 py-1 rounded-full text-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
