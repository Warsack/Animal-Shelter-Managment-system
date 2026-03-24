import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DogDetails from './pages/DogDetails';
import Admin from './pages/Admin'; // 1. IMPORTUJEMY NOWĄ STRONĘ

function App() {
  return (
    <Router>
      <div className="bg-[#f6f8f6] min-h-screen font-['Plus_Jakarta_Sans'] text-slate-900">
        {/* WSPÓLNY NAGŁÓWEK DLA WSZYSTKICH STRON */}
        <header className="sticky top-0 z-50 w-full border-b border-[#13ec13]/10 bg-[#f6f8f6]/80 backdrop-blur-md px-6 py-4 md:px-20">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Kliknięcie w logo teraz przenosi do strony głównej */}
              <a href="/" className="flex items-center gap-3 cursor-pointer">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#13ec13] text-slate-900 shadow-lg shadow-[#13ec13]/20">
                  <span className="material-symbols-outlined text-2xl">pets</span>
                </div>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Łapa Pomocy</h2>
              </a>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="/#zwierzeta" className="text-sm font-bold text-slate-600 hover:text-[#13ec13] transition-colors">
                Zwierzęta
              </a>
              <a href="/#opinie" className="text-sm font-bold text-slate-600 hover:text-[#13ec13] transition-colors">
                Opinie
              </a>
            </div>
          </div>
        </header>

        {/* DEFINICJA STRON */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pies/:id" element={<DogDetails />} />
          <Route path="/zarzadzanie-schroniskiem" element={<Admin />} />
        </Routes>

        <footer className="mt-20 border-t border-slate-100 py-10 text-center text-slate-400 text-sm">
          <p>© 2026 Łapa Pomocy. Projekt Fullstack MERN.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;