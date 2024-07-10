import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSidebar from "./components/ProjsctsSlidebar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";
import NewTasks from "./components/NewTasks.jsx";


function App() {

  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  })

  function handleAddTask(text) {
    setProjectState(prevState => {
      const taskId = Math.random()
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId
      }
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks]
      }
    })
  }
  function handleDeletetask(id) {
    setProjectState(preveState => {
      return {
        ...preveState,
        tasks: preveState.tasks.filter((task) => task.id !== id
        )
      }
    })
  }


  function handleSelectProject(id) {
    setProjectState(preveState => {
      return {
        ...preveState,
        selectedProjectId: id,
      }
    })
  }

  function handleStartAddProject() {
    setProjectState(preveState => {
      return {
        ...preveState,
        selectedProjectId: null
      }
    })
  }

  function handleCancelAddProject() {
    setProjectState(preveState => {
      return {
        ...preveState,
        selectedProjectId: undefined,
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
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  function handleDeleteProject() {
    setProjectState(preveState => {
      return {
        ...preveState,
        selectedProjectId: undefined,
        projects: preveState.projects.filter(
          (project) => project.id !== preveState.selectedProjectId
        )
      }
    })
  }

  const selectedProject = projectState.projects.find((project) => project.id === projectState.selectedProjectId)

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeletetask}
      tasks={projectState.tasks}
    />
  )

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8 ">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;