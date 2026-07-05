import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Guide from '../pages/Guide';
import Examples from '../pages/Examples';
import Tutorial from '../pages/Tutorial';
import FAQ from '../pages/FAQ';

export default function AppRoutes({ code, setCode, language, setLanguage }) {
  return (
    <Routes>
      <Route path="/" element={<Home code={code} setCode={setCode} language={language} setLanguage={setLanguage}/>} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/examples" element={<Examples />} /> 
      <Route path="/tutorial" element={<Tutorial />} />
      <Route path="/faq" element={<FAQ />} />
    </Routes>
  );
}
