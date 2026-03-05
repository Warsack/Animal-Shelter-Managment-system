import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [zwierzeta, setZwierzeta] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/zwierzeta')
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

  if (loading) return <div className="text-center py-20 font-bold text-[#13ec13]">Ładowanie piesków...</div>;

  return (
    <main className="mx-auto w-full max-w-[1200px] px-6 py-10">
      <section className="mb-12">
        <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-2">
          Nasi <span className="text-[#13ec13]">podopieczni</span>
        </h2>
        <p className="text-slate-500 italic">Znajdź przyjaciela na całe życie</p>
      </section>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {zwierzeta.map((pet) => (
          <div key={pet._id} className="group overflow-hidden rounded-[2rem] bg-white p-4 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100">
            <div className="relative h-56 w-full overflow-hidden rounded-[1.5rem] mb-6 bg-slate-100">
              <img src={pet.foto} alt={pet.imie} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="px-2">
              <h4 className="text-2xl font-black text-slate-900 mb-4">{pet.imie}</h4>
              {/* ZMIANA: Link prowadzący do podstrony */}
              <Link to={`/pies/${pet._id}`} className="block w-full text-center rounded-2xl bg-[#13ec13] py-4 text-sm font-black text-slate-900 shadow-lg shadow-[#13ec13]/20 hover:bg-[#13ec13]/90 transition-all">
                Poznaj lepiej {pet.imie}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;