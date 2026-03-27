// src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';

// Import all of our pages here!
import Home from '../pages/Home';
import Guide from '../pages/Guide';
import Examples from '../pages/Examples';
import Tutorial from '../pages/Tutorial';
import FAQ from '../pages/FAQ';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/examples" element={<Examples />} /> 
      <Route path="/tutorial" element={<Tutorial />} />
      <Route path="/faq" element={<FAQ />} />
    </Routes>
  );
}