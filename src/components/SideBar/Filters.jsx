import { useEffect, useState } from "react"
import { productsService } from "../../services/api"

function Filters({ filters, onChange }) {
    const [categoryList, setCategoryList] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {

        const categoryListProducts = async () => {
            try {
                setLoading(true)
                const categoryDataResponse = await productsService.getCategoryList() //Busca todos as categorias da API
                setCategoryList(categoryDataResponse.data) // retorna um objeto com as Categorias

            } catch (error) {
                console.error("Erro ao buscar produtos:", error)
            } finally {
                setLoading(false)
            }
        }
        categoryListProducts()
    }, [])


    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };


    return (
       <div className="flex flex-col gap-8">
      
      {/* --- SEÇÃO: ORDENAÇÃO --- */}
      <div>
        <h3 className="font-bold mb-3 text-gray-700">Ordenar por</h3>
        <select
          value={filters.sortBy}
          onChange={(e) => onChange("sortBy", e.target.value)}
          className="w-full p-2 border rounded-md bg-white shadow-sm outline-none focus:border-violet-500"
        >
          <option value="title">Título (A-Z)</option>
          <option value="price-asc">Menor Preço</option>
          <option value="price-desc">Maior Preço</option>
          <option value="rating">Melhor Avaliação</option>
        </select>
      </div>

      {/* --- SEÇÃO: PREÇO --- */}
      <div>
        <h3 className="font-bold mb-1 text-gray-700">Preço Máximo</h3>
        <p className="text-violet-600 font-bold mb-2">{formatCurrency(filters.maxPrice)}</p>
        <input
          type="range"
          min="0"
          max="40000"
          step="1"
          value={filters.maxPrice > formatCurrency(40000) ? formatCurrency(40000) : filters.maxPrice}
          onChange={(e) => onChange("maxPrice", Number(e.target.value))}
          className="w-full accent-violet-600 cursor-pointer"
          
        />
      </div>

    
      <div>
        <h3 className="font-bold mb-3 text-gray-700">Categorias</h3>
        <div className="flex flex-col gap-2 max-h-60 custom-scrollbar overflow-y-auto pr-2">
          {categoryList.map((category) => (
            <div key={category} className="flex items-center gap-2"> 
              <input
                type="checkbox"
                id={`cat-${category}`}
                className="w-4 h-4 accent-violet-600 cursor-pointer"
                checked={filters.categories.includes(category)}
                onChange={() => {
                  const newCats = filters.categories.includes(category)
                    ? filters.categories.filter((c) => c !== category)
                    : [...filters.categories, category];
                  onChange("categories", newCats);
                }}
              />
              <label 
                htmlFor={`cat-${category}`} 
                className="text-sm capitalize text-gray-600 cursor-pointer hover:text-violet-600"
              >
                {category.replace("-", " ")}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
    )
}
export default Filters;