import React, { useState } from "react";
import Community from "./pages/Community";
import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import Tab from "./components/Tab";

const App = () => {
  const [currentTab, setCurrentTab] = useState(4); // Default to "Community" tab

  return (
    <div>
      <Header/>
      <Tab/>
      <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </div>
  );
};

export default App;
