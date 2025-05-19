import { useState } from 'react';
import logo from '/v_icon.svg';

function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white p-2 border sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <a href="." className="flex items-center transform hover:scale-105 transition-transform duration-300">
                    <img src={logo} alt="Venkat Rao Manavarthi" />
                </a>
                
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
                            <a 
                                href="#about" 
                                onClick={() => setIsMenuOpen(false)}
                                className="relative group"
                            >
                                About Me
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </li>
                        <li className="block md:inline-block py-2 md:py-0 px-4 md:px-0 md:ml-6">
                            <a 
                                href="#experience" 
                                onClick={() => setIsMenuOpen(false)}
                                className="relative group"
                            >
                                Experience
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </li>
                        <li className="block md:inline-block py-2 md:py-0 px-4 md:px-0 md:ml-6">
                            <a 
                                href="#projects" 
                                onClick={() => setIsMenuOpen(false)}
                                className="relative group"
                            >
                                Projects
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </li>
                        <li className="block md:inline-block py-2 md:py-0 px-4 md:px-0 md:ml-6">
                            <a 
                                href="#skills" 
                                onClick={() => setIsMenuOpen(false)}
                                className="relative group"
                            >
                                Skills
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </li>
                        <li className="block md:inline-block py-2 md:py-0 px-4 md:px-0 md:ml-6">
                            <a 
                                href="#education" 
                                onClick={() => setIsMenuOpen(false)}
                                className="relative group"
                            >
                                Education
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        </li>
                        {/* <li className="md:inline-block mt-3 md:mt-0 md:ml-6 hover:text-black">
                            <a href="#accomplishment">Accomplishments</a>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navigation