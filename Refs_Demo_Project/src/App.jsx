import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSidebar from "./components/ProjsctsSlidebar.jsx";


function App() {

  const [projectState, setProjectState] = useState({ selctedProjectId: undefined, projects: [] })

  function handleStartAddProject() {
    setProjectState(preveState => {
      return {
        ...preveState,
        selctedProjectId: null
      }
    })
  }

  function handleAddProject(projectData) {
    setProjectState(prevState => {
      const projectId = Math.random()
      const newProject = {
        ...projectData,
        id: projectId
      }
      return {
        ...prevState,
        selctedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }
  console.log(projectState)

  let content;

  if (projectState.selctedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} />
  } else if (projectState.selctedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8 ">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} projects={projectState.projects} />
      {content}
    </main>
  );
}

export default App;