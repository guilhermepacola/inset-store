import { useState} from 'react'
import { useOutletContext } from "react-router-dom";
import './index.css'
import Container from './components/Container/Container'
import Product from './pages/Product'
import SideBarFilter from './components/SideBar/SideBarFilter'


function App() {
  const [searchValue] = useOutletContext();
  
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
    <main className='flex h-full overflow-hidden'>
    <aside className="w-64 h-full custom-scrollbar ">
        <SideBarFilter
          filters={filters}
          onChange={handleFilterChange} 
        />
      </aside>
     <section className='flex-1 overflow-y-auto custom-scrollbar bg-gray-50'>
        <Container>
          <Product currentFilters={filters} searchValue={searchValue} />
        </Container>
      </section>
    </main>
  )
}

export default App
