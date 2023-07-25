import Navbar from "@/scenes/navbar";
import { useState } from "react";
import { SelectedPage } from "@/shared/types";

function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  );
  return (
    <div className="app bg-gray-20 bg-gray-50">
      <Navbar selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
      <h1>CECI EST UNE MODIF INUTILE #CI/CD</h1>
    </div>
  );
}

export default App;
