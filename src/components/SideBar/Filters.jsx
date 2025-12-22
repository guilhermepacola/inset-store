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
        <div className="flex flex-col gap-6 md:gap-8">
            
            {/* --- SEÇÃO: ORDENAÇÃO --- */}
            <div>
                <h3 className="font-bold mb-3 text-gray-700 text-sm md:text-base uppercase tracking-wider">
                    Ordenar por
                </h3>
                <select
                    value={filters.sortBy}
                    onChange={(e) => onChange("sortBy", e.target.value)}
                    className="w-full p-3 md:p-2 border rounded-xl md:rounded-md bg-white shadow-sm outline-none focus:border-violet-500 text-sm"
                >
                    <option value="title">Título (A-Z)</option>
                    <option value="price-asc">Menor Preço</option>
                    <option value="price-desc">Maior Preço</option>
                    <option value="rating">Melhor Avaliação</option>
                </select>
            </div>

            {/* --- SEÇÃO: PREÇO --- */}
            <div>
                <h3 className="font-bold mb-1 text-gray-700 text-sm md:text-base uppercase tracking-wider">
                    Preço Máximo
                </h3>
                <p className="text-violet-600 font-extrabold text-lg mb-2">
                    {formatCurrency(filters.maxPrice)}
                </p>
                <input
                    type="range"
                    min="0"
                    max="40000"
                    step="10"
                    value={filters.maxPrice} // Removida a lógica de string que causava erro
                    onChange={(e) => onChange("maxPrice", Number(e.target.value))}
                    className="w-full accent-violet-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                    <span>R$ 0</span>
                    <span>R$ 40.000</span>
                </div>
            </div>

            {/* --- SEÇÃO: CATEGORIAS --- */}
            <div>
                <h3 className="font-bold mb-3 text-gray-700 text-sm md:text-base uppercase tracking-wider">
                    Categorias
                </h3>
                
                {loading ? (
                    <div className="flex gap-2 items-center text-gray-400 text-sm">
                        <div className="animate-spin h-4 w-4 border-2 border-violet-500 border-t-transparent rounded-full"></div>
                        Carregando...
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 md:gap-2 max-h-80 md:max-h-60 custom-scrollbar overflow-y-auto pr-2">
                        {categoryList.map((category) => (
                            <div key={category} className="group flex items-center gap-3"> 
                                <input
                                    type="checkbox"
                                    id={`cat-${category}`}
                                    className="w-5 h-5 md:w-4 md:h-4 accent-violet-600 cursor-pointer rounded border-gray-300"
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
                                    className="text-sm md:text-xs capitalize text-gray-600 cursor-pointer flex-1 py-1 group-hover:text-violet-600 transition-colors"
                                >
                                    {category.replace(/-/g, " ")}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
export default Filters;