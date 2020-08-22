import React from 'react';
import NewProject from '../projects/NewProject';
import ProjectsList from '../projects/ProjectsList';

const Sidebar = () => {
    return (
        <aside>
            <h1 className="pointer" onClick={() => window.location.reload()}>MERN<span>Tasks</span></h1>
            {/* ADD NEW PROJECT FORM */}
            <NewProject />

            {/* PROJECTS LIST */}
            <div className="proyectos">
                <h2><i className="fas fa-folder-open"></i> Mis proyectos</h2>
                <ProjectsList />
            </div>
        </aside>
    );
};

export default Sidebar;