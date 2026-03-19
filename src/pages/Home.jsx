import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [zwierzeta, setZwierzeta] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/zwierzeta`)
      .then(res => res.json())
      .then(data => {
        setZwierzeta(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Błąd:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-screen font-black text-[#13ec13] text-2xl animate-pulse">
      Ładowanie piesków...
    </div>
  );

  return (
    <div className="animate-in fade-in duration-1000">
      
      {/* --- SEKCJA HERO (TEN WIELKI BANER) --- */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-24 border-b border-slate-50">
        <div className="mx-auto max-w-[1200px] px-6 flex flex-col lg:flex-row items-center gap-12">
          
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#13ec13]/10 text-[#13ec13] font-bold text-[10px] mb-6 uppercase tracking-[0.2em]">
              Schronisko Nowej Generacji
            </span>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] mb-6">
              Każda łapa zasługuje na <span className="text-[#13ec13]">ciepły dom.</span>
            </h1>
            <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Łapa Pomocy to miejsce, gdzie porzucone serca odnajdują nadzieję. Pomóż nam tworzyć historie ze szczęśliwym zakończeniem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="#zwierzeta" className="px-10 py-5 bg-[#13ec13] text-slate-900 font-black rounded-2xl shadow-xl shadow-[#13ec13]/30 hover:bg-[#11d611] hover:-translate-y-1 transition-all duration-300 text-center">
                Adoptuj teraz
              </a>
              <button className="px-10 py-5 bg-white border-2 border-slate-100 text-slate-900 font-black rounded-2xl hover:bg-slate-50 hover:border-slate-200 hover:-translate-y-1 transition-all duration-300">
                Wesprzyj nas
              </button>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="relative z-10 overflow-hidden rounded-[4rem] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800" 
                alt="Szczęśliwe psy" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#13ec13]/20 rounded-full blur-[80px] -z-10 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* --- STATYSTYKI --- */}
      <section className="bg-slate-900 py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-5xl font-black text-[#13ec13] mb-2">{zwierzeta.length}</p>
              <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Zwierząt w schronisku</p>
            </div>
            <div>
              <p className="text-5xl font-black text-[#13ec13] mb-2">148</p>
              <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Szczęśliwych adopcji</p>
            </div>
            <div>
              <p className="text-5xl font-black text-[#13ec13] mb-2">3</p>
              <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Lata działalności</p>
            </div>
            <div>
              <p className="text-5xl font-black text-[#13ec13] mb-2">98%</p>
              <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Zadowolonych adopcji</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- LISTA PODOPIECZNYCH --- */}
      <main id="zwierzeta" className="mx-auto w-full max-w-[1200px] px-6 py-24">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-5xl font-black tracking-tight text-slate-900 mb-4">
              Nasi <span className="text-[#13ec13]">podopieczni</span>
            </h2>
            <p className="text-slate-400 text-lg">Poznaj zwierzęta, które czekają właśnie na Ciebie</p>
          </div>
          
          <div className="flex bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
            <button className="px-8 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold shadow-lg transition-all">Wszystkie</button>
            <button className="px-8 py-3 rounded-xl text-slate-400 text-sm font-bold hover:text-slate-900 transition-all">Psy</button>
            <button className="px-8 py-3 rounded-xl text-slate-400 text-sm font-bold hover:text-slate-900 transition-all">Koty</button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 text-left">
          {zwierzeta.map((pet) => (
            <div key={pet._id} className="group relative rounded-[3rem] bg-white p-6 shadow-sm hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 border border-slate-50">
              <div className="relative h-72 w-full overflow-hidden rounded-[2.5rem] mb-8">
                <img src={pet.foto} alt={pet.imie} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-5 left-5">
                  <span className="bg-white/90 backdrop-blur-md px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-xl">
                    {pet.rasa}
                  </span>
                </div>
              </div>
              
              <div className="px-2">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h4 className="text-3xl font-black text-slate-900 mb-1">{pet.imie}</h4>
                    <p className="text-[#13ec13] font-bold text-sm uppercase tracking-tighter">{pet.wiek} • {pet.status}</p>
                  </div>
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-[#13ec13]/10 text-[#13ec13] group-hover:bg-[#13ec13] group-hover:text-slate-900 transition-colors duration-300">
                    <span className="material-symbols-outlined text-2xl font-bold">pets</span>
                  </div>
                </div>
                
                <Link 
                  to={`/pies/${pet._id}`} 
                  className="block w-full text-center rounded-[1.5rem] bg-slate-900 py-5 text-sm font-black text-white hover:bg-[#13ec13] hover:text-slate-900 shadow-xl shadow-slate-200 transition-all duration-300"
                >
                  Poznaj lepiej {pet.imie}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- OPINIE --- */}
      <section id="opinie" className="bg-white py-24 border-t border-slate-50">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#13ec13]/10 text-[#13ec13] font-bold text-[10px] mb-4 uppercase tracking-[0.2em]">
              Historie adopcji
            </span>
            <h2 className="text-5xl font-black tracking-tight text-slate-900">
              Co mówią nasi <span className="text-[#13ec13]">adoptujący</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                imie: 'Marta K.',
                lokalizacja: 'Warszawa',
                opinia: 'Adoptowałam Burka 2 lata temu i to była najlepsza decyzja w moim życiu. Cały proces był prosty i profesjonalny. Polecam każdemu!',
                zwierze: 'Adoptowała Burka',
                avatar: 'M',
              },
              {
                imie: 'Tomasz W.',
                lokalizacja: 'Kraków',
                opinia: 'Schronisko pomogło mi znaleźć idealnego towarzysza. Moja kotka Luna jest teraz gwiazdą całej rodziny. Dziękuję całemu zespołowi!',
                zwierze: 'Adoptował Lunę',
                avatar: 'T',
              },
              {
                imie: 'Ania i Piotr',
                lokalizacja: 'Wrocław',
                opinia: 'Baliśmy się czy uda nam się zaopiekować psem, ale schronisko przeprowadziło nas przez wszystko krok po kroku. Rex jest teraz nieodłączną częścią rodziny.',
                zwierze: 'Adoptowali Rexa',
                avatar: 'A',
              },
            ].map((o) => (
              <div key={o.imie} className="bg-slate-50 rounded-[2.5rem] p-8 flex flex-col gap-6 border border-slate-100">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#13ec13] text-lg">★</span>
                  ))}
                </div>
                <p className="text-slate-600 leading-relaxed italic flex-1">"{o.opinia}"</p>
                <div className="flex items-center gap-4 pt-2 border-t border-slate-200">
                  <div className="w-12 h-12 rounded-2xl bg-[#13ec13] flex items-center justify-center text-slate-900 font-black text-lg flex-shrink-0">
                    {o.avatar}
                  </div>
                  <div>
                    <p className="font-black text-slate-900">{o.imie}</p>
                    <p className="text-xs text-[#13ec13] font-bold uppercase tracking-wider">{o.zwierze} • {o.lokalizacja}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;