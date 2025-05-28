import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '/v_icon.svg';
import githubIcon from '../assets/github.svg';
import linkedinIcon from '../assets/linkedin.svg';
import emailIcon from '../assets/email.svg';

function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSectionClick = (section) => {
        setIsMenuOpen(false);
        if (window.location.pathname !== '/') {
            navigate('/', { state: { scrollTo: section } });
        } else {
            const element = document.getElementById(section);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <nav className="bg-white p-2 border sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center transform hover:scale-105 transition-transform duration-300">
                    <img src={logo} alt="Venkat Rao Manavarthi" />
                </Link>
                {/* Hamburger menu button */}
                <button 
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none transition-colors duration-300"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <svg 
                        className="w-6 h-6 text-red-500 transform transition-transform duration-300"
                        fill="none" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        {isMenuOpen ? (
                            <path d="M6 18L18 6M6 6l12 12" className="transition-all duration-300" />
                        ) : (
                            <path d="M4 6h16M4 12h16M4 18h16" className="transition-all duration-300" />
                        )}
                    </svg>
                </button>

                {/* Navigation menu */}
                <div 
                    className={`
                        ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'} 
                        md:opacity-100 md:translate-y-0 md:pointer-events-auto
                        absolute md:relative top-full left-0 right-0 
                        bg-white md:bg-transparent 
                        border-b md:border-0 
                        md:flex md:items-center md:w-auto
                        transition-all duration-300 ease-in-out
                        shadow-lg md:shadow-none
                    `}
                >
                    <ul className="text-md font-medium md:flex md:flex-grow text-red-500">
                        <li className="block md:inline-block py-2 md:py-0 px-4 md:px-0 md:ml-6">
                            <button 
                                onClick={() => handleSectionClick('about')}
                                className="relative group"
                            >
                                About Me
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        </li>
                        <li className="block md:inline-block py-2 md:py-0 px-4 md:px-0 md:ml-6">
                            <button 
                                onClick={() => handleSectionClick('experience')}
                                className="relative group"
                            >
                                Experience
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        </li>
                        <li className="block md:inline-block py-2 md:py-0 px-4 md:px-0 md:ml-6">
                            <button 
                                onClick={() => handleSectionClick('projects')}
                                className="relative group"
                            >
                                Projects
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        </li>
                        <li className="block md:inline-block py-2 md:py-0 px-4 md:px-0 md:ml-6">
                            <button 
                                onClick={() => handleSectionClick('skills')}
                                className="relative group"
                            >
                                Skills
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        </li>
                        <li className="block md:inline-block py-2 md:py-0 px-4 md:px-0 md:ml-6">
                            <button 
                                onClick={() => handleSectionClick('awards')}
                                className="relative group"
                            >
                                Awards
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        </li>
                        <li className="block md:inline-block py-2 md:py-0 px-4 md:px-0 md:ml-6">
                            <button 
                                onClick={() => handleSectionClick('education')}
                                className="relative group"
                            >
                                Education
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                            </button>
                        </li>
                        <li className="block md:inline-block py-2 md:py-0 px-4 md:px-0 md:ml-6">
                            <Link 
                                to="/hackathons" 
                                onClick={() => setIsMenuOpen(false)}
                                className="relative group"
                            >
                                Hackathons
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li className="block md:inline-block py-2 md:py-0 px-4 md:px-0 md:ml-6">
                            <Link 
                                to="/blog" 
                                onClick={() => setIsMenuOpen(false)}
                                className="relative group"
                            >
                                Blog
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                        <li className="block md:inline-block py-2 md:py-0 px-4 md:px-0 md:ml-6">
                            <a href="https://github.com/venkatmanavarthi" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex items-center group">
                                <img src={githubIcon} alt="GitHub" className="w-6 h-6 mr-1 group-hover:scale-110 transition-transform" />
                                <span className="sr-only">GitHub</span>
                            </a>
                        </li>
                        <li className="block md:inline-block py-2 md:py-0 px-4 md:px-0 md:ml-2">
                            <a href="https://www.linkedin.com/in/venkatrao-manavarthi/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center group">
                                <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6 mr-1 group-hover:scale-110 transition-transform" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </li>
                        <li className="block md:inline-block py-2 md:py-0 px-4 md:px-0 md:ml-2">
                            <a href="mailto:manavarthivenkat@icloud.com" aria-label="Email" className="flex items-center group">
                                <img src={emailIcon} alt="Email" className="w-6 h-6 mr-1 group-hover:scale-110 transition-transform" />
                                <span className="sr-only">Email</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navigation