import { useState } from "react";
import MainBar from "./components/MainBar";
import Sidebar from "./components/Sidebar";


function App() {
  const [active, setActive] = useState('home');
  const [showSideBar, setShowSideBar] = useState(false)

  return (
    <div className="grid lg:grid-cols-[256px,1fr] grid-cols-1 w-full overflow-hidden">
      <Sidebar active={active} setActive={setActive} showSideBar={showSideBar}  />
      <MainBar setActive={setActive} setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
    </div>
  );
}

export default App;
