import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { useState } from "react"
import Navbar from "./Components/Navbar"
import Home from "./Pages/Home"
import TradeMarket from "./Pages/TradeMarket"
import Helpers from "./Pages/Helpers"
import PostResource from "./Pages/PostResource"
import Profile from "./Pages/Profile"

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <Router>
      <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
      <Routes>
        <Route path="/" element={<Home isSidebarOpen={isSidebarOpen}  />} />
        <Route path="/TradeMarket" element={<TradeMarket isSidebarOpen={isSidebarOpen} />} />
        <Route path="/Helpers" element={<Helpers isSidebarOpen={isSidebarOpen}  />} />
        <Route path="/PostResource" element={<PostResource isSidebarOpen={isSidebarOpen} />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
