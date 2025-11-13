import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner"; 
import MenuBar from "./components/MenuBar";

// Correct imports (adjust if nested)
import LandingPage from "./pages/landingPage/landingPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MainPage from "./pages/MainPage.jsx";
import PreviewPage from "./pages/PreviewPage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <MenuBar />
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generate" element={<MainPage />} />
        <Route path="/preview" element={<PreviewPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
