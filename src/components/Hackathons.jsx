import { useContext } from "react";
import { DataContext } from "../common/DataContext";
import globe from '../assets/globe.svg';

function Hackathons() {
    const data = useContext(DataContext);
    if (!data || !data.hackathons) {
        return <div className="p-4 mt-4 container mx-auto">No hackathon data available.</div>;
    }
    return (
        <div id="hackathons" className="p-4 mt-8 container mx-auto max-w-2xl" style={{fontFamily: 'Manrope, Noto Sans, sans-serif'}}>
            <h1 className="text-center text-2xl font-bold mb-8" style={{color: '#ff5252', letterSpacing: '-0.015em'}}>Hackathons</h1>
            <div className="space-y-6">
                {data.hackathons.map((hackathon, index) => (
                    <div key={index} className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border hover:shadow-lg transition-shadow duration-200" style={{borderColor: '#f1f2f4'}}>
                        <div className="flex items-center gap-3 mb-1">
                            <span className="text-lg font-bold" style={{color: '#121417'}}>{hackathon.title}</span>
                            {hackathon.url && (
                                <a href={hackathon.url} target="_blank" rel="noopener noreferrer" title="View Hackathon Website">
                                    <img src={globe} alt="link" className="w-5 h-5 hover:opacity-80" />
                                </a>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-sm mb-1">
                            <span className="px-2 py-0.5 rounded-full font-medium" style={{background: '#ffeaea', color: '#ff5252'}}>{hackathon.event}</span>
                            <span style={{color: '#677583'}}>{hackathon.date}</span>
                            {hackathon.award && (
                                <span className="px-2 py-0.5 rounded-full font-medium" style={{background: '#eafbe7', color: '#2e7d32'}}>{hackathon.award}</span>
                            )}
                        </div>
                        {hackathon.description && (
                            <div className="text-base leading-relaxed mt-1" style={{color: '#677583'}}>{hackathon.description}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Hackathons;
