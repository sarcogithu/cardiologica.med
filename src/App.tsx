import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { DXPage } from './pages/DXPage';
import { AIPage } from './pages/AIPage';
import { CordisPage } from './pages/CordisPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cardiologica-dx" element={<DXPage />} />
        <Route path="/cardiologica-ai" element={<AIPage />} />
        <Route path="/cordis-dx" element={<CordisPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}
