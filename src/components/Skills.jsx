import { useContext, useState, useEffect } from "react";
import { DataContext } from "../common/DataContext";

function Skills() {
    const data = useContext(DataContext);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [contributions, setContributions] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [totalContributions, setTotalContributions] = useState(0);
    const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });

    useEffect(() => {
        // Check if dark mode is enabled
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeMediaQuery.matches);

        // Listen for changes in dark mode
        const handleDarkModeChange = (e) => setIsDarkMode(e.matches);
        darkModeMediaQuery.addEventListener('change', handleDarkModeChange);

        return () => darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
    }, []);

    useEffect(() => {
        const fetchContributions = async () => {
            try {
                const response = await fetch('https://github-contributions-api.jogruber.de/v4/venkatmanavarthi?y=last');
                if (!response.ok) throw new Error('Failed to fetch contributions');
                const data = await response.json();
                setContributions(data.contributions);
                // Calculate total contributions
                const total = data.contributions.reduce((sum, day) => sum + day.count, 0);
                setTotalContributions(total);
                setIsLoading(false);
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        };

        fetchContributions();
    }, []);

    if (!data) {
        return <div>Loading....</div>
    }

    const skills = data.skills.map((skill, i) => <li className="shadow-2xl hover:shadow p-2 bg-red-400 inline-block rounded mt-1" key={i}>{ skill }</li>)

    const getColorClass = (count) => {
        if (count === 0) return isDarkMode ? 'bg-[#1e293b]' : 'bg-[#ebedf0]';
        if (count <= 3) return 'bg-[#4ade80]';  // Lightest green
        if (count <= 6) return 'bg-[#22c55e]';  // Light green
        if (count <= 9) return 'bg-[#16a34a]';  // Medium green
        return 'bg-[#15803d]';  // Darkest green
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getTooltipText = (contribution) => {
        const date = formatDate(contribution.date);
        const count = contribution.count;
        if (count === 0) {
            return `No contributions on ${date}`;
        }
        return `${count} contribution${count === 1 ? '' : 's'} on ${date}`;
    };

    const handleMouseEnter = (e, contribution) => {
        const rect = e.target.getBoundingClientRect();
        const tooltipX = rect.left + (rect.width / 2);
        const tooltipY = rect.top - 10;
        
        setTooltip({
            show: true,
            text: getTooltipText(contribution),
            x: tooltipX,
            y: tooltipY
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ show: false, text: '', x: 0, y: 0 });
    };

    // Group contributions by week
    const weeks = [];
    for (let i = 0; i < contributions.length; i += 7) {
        weeks.push(contributions.slice(i, i + 7));
    }

    return (
        <div id="skills" className="p-4 mt-4 container mx-auto max-w-6xl">
            <h1 className="text-center text-3xl font-semibold">Skills</h1>
            <ul className="mt-4 flex flex-wrap font-medium justify-center space-x-3 text-white">
                {skills}
            </ul>
            <div className="mt-4 flex flex-col items-center justify-center relative">
                {isLoading ? (
                    <div>Loading GitHub contributions...</div>
                ) : error ? (
                    <div>Unable to load GitHub contributions</div>
                ) : (
                    <>
                        <div className="flex gap-1 overflow-x-auto max-w-full px-4">
                            {weeks.map((week, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col gap-1">
                                    {week.map((contribution, dayIndex) => (
                                        <div
                                            key={`${weekIndex}-${dayIndex}`}
                                            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-sm ${getColorClass(contribution.count)} cursor-pointer transition-transform hover:scale-110`}
                                            onMouseEnter={(e) => handleMouseEnter(e, contribution)}
                                            onMouseLeave={handleMouseLeave}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {totalContributions} contributions in the last year
                        </div>
                        {tooltip.show && (
                            <div 
                                className="fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg"
                                style={{
                                    left: `${tooltip.x}px`,
                                    top: `${tooltip.y}px`,
                                    transform: 'translate(-50%, -100%)'
                                }}
                            >
                                {tooltip.text}
                                <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Skills
