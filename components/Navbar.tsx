import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="sticky top-0 bg-background p-4 shadow-md">
            <ul className="flex space-x-4">
                <li><a href="#education" className="text-text">Education</a></li>
                <li><a href="#skills" className="text-text">Skills</a></li>
                <li><a href="#projects" className="text-text">Projects</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;