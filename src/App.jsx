import { useState } from 'react'
import { useOutletContext } from "react-router-dom";
import './index.css'
import Product from './pages/Product'
import Container from './components/Container/Container'
import SideBarFilter from './components/SideBar/SideBarFilter'
import { FaFilter } from 'react-icons/fa';


function App() {
  const [searchValue] = useOutletContext();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    categories: [],
    maxPrice: 40000,
    minRating: 0,
    sortBy: 'default' // 'price-asc', 'price-desc', 'rating'
  });


  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev, [filterType]: value
    }));
  }
  return (
    <main className='flex h-full overflow-hidden relative '>
      <aside className={`
      custom-scrollbar
        fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:shadow-none lg:z-0
        ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>

        <div className="lg:hidden p-4 flex justify-end border-b">
          <button onClick={() => setIsFilterOpen(false)} className="text-violet-600 font-bold">
            FECHAR
          </button>
        </div>
        <SideBarFilter filters={filters} onChange={handleFilterChange} />
      </aside>

      {isFilterOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsFilterOpen(false)}
        />
      )}

      <section className='flex-1 overflow-y-auto custom-scrollbar bg-gray-50 flex flex-col'>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="lg:hidden fixed top-32 right-6 z-30 bg-violet-600 text-white p-2 rounded-full shadow-lg flex items-center gap-2 active:scale-95 transition-transform">
          <span className='flex items-center gap-2'><FaFilter/> Filtrar</span>
        </button>

        <div className="flex-1">
          <Container className={'sm:mx-auto lg:mx-32'}>
            <Product currentFilters={filters} searchValue={searchValue} />
          </Container>
        </div>
      </section>
    </main>
  )
}

export default App
