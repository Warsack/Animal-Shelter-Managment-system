import React from 'react';

function App() {
  return (
    <div className="bg-[#f6f8f6] min-h-screen font-['Plus_Jakarta_Sans'] text-slate-900 selection:bg-[#13ec13]/30">
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          
          {/* HEADER */}
          <header className="sticky top-0 z-50 w-full border-b border-[#13ec13]/10 bg-[#f6f8f6]/80 backdrop-blur-md px-6 py-4 md:px-20 lg:px-40">
            <div className="mx-auto flex max-w-[1200px] items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#13ec13] text-slate-900 shadow-lg shadow-[#13ec13]/20">
                  <span className="material-symbols-outlined text-2xl">pets</span>
                </div>
                <h2 className="text-xl font-extrabold tracking-tight text-slate-900">Łapa Pomocy</h2>
              </div>
              <nav className="hidden items-center gap-8 lg:flex">
                <a className="text-sm font-semibold hover:text-[#13ec13] transition-colors" href="#about">O nas</a>
                <a className="text-sm font-semibold hover:text-[#13ec13] transition-colors" href="#animals">Zwierzęta</a>
                <a className="text-sm font-semibold hover:text-[#13ec13] transition-colors" href="#help">Pomoc</a>
                <a className="text-sm font-semibold hover:text-[#13ec13] transition-colors" href="#contact">Kontakt</a>
              </nav>
              <div className="flex items-center gap-4">
                <button className="flex items-center justify-center rounded-xl bg-[#13ec13] px-6 py-2.5 text-sm font-bold text-slate-900 shadow-md hover:scale-105 active:scale-95 transition-all">
                  Rejestracja
                </button>
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-[1200px] px-6 py-10 md:px-20 lg:px-10">
            {/* HERO SECTION */}
            <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 mb-16">
              <div className="lg:col-span-7 flex flex-col justify-center gap-8">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#13ec13]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#13ec13]">
                  <span className="material-symbols-outlined text-sm">favorite</span> Znajdź miłość swojego życia
                </div>
                <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-slate-900 md:text-6xl">
                  Każda łapa zasługuje na <span className="text-[#13ec13]">ciepły dom</span>.
                </h1>
                <p className="text-lg leading-relaxed text-slate-600 max-w-[540px]">
                  Łapa Pomocy to miejsce, gdzie porzucone serca odnajdują nadzieję. Pomóż nam tworzyć historie ze szczęśliwym zakończeniem.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="flex h-14 items-center justify-center rounded-xl bg-[#13ec13] px-8 text-lg font-extrabold text-slate-900 shadow-xl shadow-[#13ec13]/20 hover:bg-[#13ec13]/90 transition-all">
                    Adoptuj teraz
                  </button>
                </div>
              </div>
              <div className="lg:col-span-5 relative">
                <div className="aspect-square w-full overflow-hidden rounded-3xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="h-full w-full bg-slate-300 flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-white">image</span>
                  </div>
                </div>
              </div>
            </section>

            {/* NASI PODOPIECZNI - Tu potem podepniemy BAZĘ */}
            <section className="mb-16" id="animals">
              <h2 className="text-3xl font-black mb-8">Nasi podopieczni</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Karta testowa */}
                <div className="group overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-100 p-6">
                  <h4 className="text-2xl font-bold">Reksio</h4>
                  <p className="text-slate-600 text-sm mb-4">Czeka na połączenie z MongoDB...</p>
                  <button className="w-full rounded-xl bg-[#13ec13]/10 py-2.5 text-sm font-bold text-slate-900 hover:bg-[#13ec13] transition-colors">
                    Zobacz profil
                  </button>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}

export default App;