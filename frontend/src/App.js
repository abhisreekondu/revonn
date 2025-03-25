import React from "react";
import BottomNav from "./components/BottomNav";
import Header from "./components/Header";
import Tab from "./components/Tab";

const App = () => {
  return (
    <div>
      <Header/>
      <Tab/>
      <BottomNav/>
    </div>
  );
};

export default App;
