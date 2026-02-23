import React from 'react';

interface EducationItem {
    degree: string;
    school: string;
    duration: string;
}

const educationData: EducationItem[] = [
    { degree: 'Bachelor of Science in Computer Science', school: 'University A', duration: '2018 - 2022' },
    { degree: 'Master of Science in Software Engineering', school: 'University B', duration: '2022 - 2024' },
];

const Education: React.FC = () => {
    return (
        <div className="p-4" id="education">
            <h2 className="text-xl font-bold text-text">Education</h2>
            <ul className="list-disc pl-5 text-text">
                {educationData.map((item, index) => (
                    <li key={index} className="my-2">
                        {item.degree} | {item.school} | {item.duration}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Education;