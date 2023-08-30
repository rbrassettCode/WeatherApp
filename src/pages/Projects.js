import React from "react";
import ProjectCard from './ProjectCard';
import weatherIcon from '../images/weather_icon.png';
import todoIcon from '../images/to-do-list.png';

function Projects() {
    const projectData = [
        {
            title: "Weather App",
            description: "This app uses the openweathermap API's to search the current weather of a given major city.",
            imageUrl: weatherIcon,
            routelink: "/portfolio/Weather"
        },
        {
            title: "To Do List",
            description: "A simple application where you can create and delte tasks that you need to complete that are saved under local storage so they are not lost.",
            imageUrl: todoIcon,
            routelink: "/portfolio/ToDoList"
        },
    ];

    return (
        <div className="projects-container" style={{display: "flex"}} >
            {projectData.map((project, index) => (
                <ProjectCard 
                    key={index}
                    title={project.title}
                    description={project.description}
                    imageUrl={project.imageUrl}
                    routelink={project.routelink}
                />
            ))} 
        </div>
    );
}

export default Projects;