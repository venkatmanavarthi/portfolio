import { useContext } from "react";
import { DataContext } from "../common/DataContext";

function Awards() {
    const data = useContext(DataContext);
    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div id="awards" className="p-4 mt-4 container mx-auto">
            <h1 className="text-center text-3xl font-semibold">Awards & Achievements</h1>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.awards.map((award, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            {award.image && (
                                <div className="w-full md:w-1/3 flex justify-center">
                                    <img 
                                        src={award.image} 
                                        alt={award.title || "Award"} 
                                        className="w-32 h-32 object-contain rounded-lg shadow-md"
                                    />
                                </div>
                            )}
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-md font-semibold text-red-500">{award.title}</h3>
                                <p className="text-gray-600 mt-2">{award.issuer}</p>
                                <p className="text-sm text-black mt-1">{award.date}</p>
                                {award.description && (
                                    <p className="mt-3 text-gray-700">{award.description}</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Awards; 