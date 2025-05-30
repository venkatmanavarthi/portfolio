import { useContext, useState, useEffect } from "react";
import { DataContext } from "../common/DataContext";

function Skills() {
    const data = useContext(DataContext);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [contributions, setContributions] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [totalContributions, setTotalContributions] = useState(0);

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
        if (count === 0) return 'bg-[#ebedf0]';
        if (count <= 3) return 'bg-[#15803d]';
        if (count <= 6) return 'bg-[#16a34a]';
        if (count <= 9) return 'bg-[#22c55e]';
        return 'bg-[#4ade80]';
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
            <div className="mt-4 flex flex-col items-center justify-center">
                {isLoading ? (
                    <div>Loading GitHub contributions...</div>
                ) : error ? (
                    <div>Unable to load GitHub contributions</div>
                ) : (
                    <>
                        <div className="flex gap-1">
                            {weeks.map((week, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col gap-1">
                                    {week.map((contribution, dayIndex) => (
                                        <div
                                            key={`${weekIndex}-${dayIndex}`}
                                            className={`w-3 h-3 rounded-sm ${getColorClass(contribution.count)}`}
                                            title={`${contribution.date}: ${contribution.count} contributions`}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            {totalContributions} contributions in the last year
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Skills
