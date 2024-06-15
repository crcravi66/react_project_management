import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectsSidebar from "./components/ProjsctsSlidebar.jsx";


function App() {
  const [projectState, setProjectState] = useState({ selctedProjectId: undefined, project: [] })

  function handleStartAddProject() {
    setProjectState(preveState => {
      return {
        ...preveState,
        selctedProjectId: null
      }
    })
  }

  let content;

  if (projectState.selctedProjectId === null) {
    content = <NewProject />
  } else if (projectState.selctedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />

  }

  return (
    <main className="h-screen my-8 flex gap-8 ">
      <ProjectsSidebar onStartAddProject={handleStartAddProject} />
      {content}
    </main>
  );
}

export default App;