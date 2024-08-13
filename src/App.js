import React, { useEffect } from "react";
import Sidebar, { SidebarProvider } from "./components/sidebar/Sidebar";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/sidebar/header";
import Dashboard from "./components/dashboard/dashboard";
import TopicView from "./components/topicView/topicView";
import Learn from "./components/learn/learn";
function App() {
  const [activeMenu, setActiveMenu] = React.useState("");
  const [activeSubject, setActiveSubject] = React.useState(null);
  const [header, setHeader] = React.useState("EDU Tube");

  useEffect(() => {
    const activeSubject = localStorage.getItem("activeSubject");
    if (activeSubject) {
      setActiveSubject(JSON.parse(activeSubject));
    }
  }, []);

  useEffect(() => {
    if(!activeSubject) return;
    localStorage.setItem("activeSubject", JSON.stringify(activeSubject));
  }, [activeSubject]);

  return (
    <HashRouter>
      <SidebarProvider
        value={{
          active: activeMenu,
          setActive: setActiveMenu,
          activeSubject: activeSubject,
          setActiveSubject: setActiveSubject,
          header: header,
          setHeader: setHeader,
        }}
      >
        <div className="App">
          <div>
            <Sidebar />
          </div>
          <div>
            <Header />
            <Routes>
              <Route path="/:subject/:topic/:videoId" element={<Learn />} />
              <Route path="/:subject/:topic" element={<TopicView />} />
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </div>
      </SidebarProvider>
    </HashRouter>
  );
}

export default App;
