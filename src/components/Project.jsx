import github from '../assets/github.svg';

function Project(props) {
    const projectItems = props.project.work.map((work, i) => <li key={i}>{work}</li>);

    return (
        <div className="shadow-2xl rounded-lg">
            <div className="p-4 text-md font-medium bg-clip-border rounded-t-xl text-red-500 flex justify-between items-center">
                <div>
                    <h3>{props.project.title}</h3>
                    <h4>{props.project.type}</h4>
                </div>
                {props.project.githubUrl && (
                    <a 
                        href={props.project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:opacity-80 transition-opacity"
                    >
                        <img 
                            className="w-8 h-8" 
                            src={github} 
                            alt="GitHub Repository"
                        />
                    </a>
                )}
            </div>
            <div className="p-4 text-md font-normal">
                { props.project.summary }
            </div>
            <div className="p-4 rounded-b-xl bg-clip-border text-md font-normal">
                <ul>
                    { projectItems }
                </ul>
            </div>
        </div>
    );
}

export default Project
