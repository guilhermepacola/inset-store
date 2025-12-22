import { useState, useEffect, useRef } from "react";
import { productsService } from "../services/api";
import Container from "../components/Container/Container";
import ProductCard from "../components/ui/ProductCard";

function Product({ currentFilters, searchValue = "" }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Estados para o Scroll Infinito
    const [visibleCount, setVisibleCount] = useState(10);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const observerTarget = useRef(null);

    useEffect(() => {
        const getInitialProducts = async () => {
            try {
                setLoading(true);
                const productsDataResponse = await productsService.getAll();
                setProducts(productsDataResponse.data.products);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            } finally {
                setLoading(false);
            }
        };
        getInitialProducts();
    }, []);

    // 1. Filtragem e Ordenação da lista única
    const filteredProducts = products.filter(product => {
        const matchesCategory = currentFilters.categories.length === 0 ||
            currentFilters.categories.includes(product.category);
        const matchesPrice = product.price <= currentFilters.maxPrice;
        const matchesSearch = product.title.toLowerCase().includes((searchValue || "").toLowerCase());
        return matchesCategory && matchesPrice && matchesSearch;
    }).sort((a, b) => {
        if (currentFilters.sortBy === 'price-asc') return a.price - b.price;
        if (currentFilters.sortBy === 'price-desc') return b.price - a.price;
        if (currentFilters.sortBy === 'rating') return b.rating - a.rating;
        return a.title.localeCompare(b.title);
    });

    // 2. Paginação sobre a lista filtrada
    const displayProducts = filteredProducts.slice(0, visibleCount);

    // 3. Função para carregar mais itens
    const handleLoadMore = () => {
        if (isFetchingMore || visibleCount >= filteredProducts.length) return;
        setIsFetchingMore(true);
        setTimeout(() => {
            setVisibleCount(prev => prev + 5);
            setIsFetchingMore(false);
        }, 600);
    };

    // 4. Observer para Scroll Infinito
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isFetchingMore) {
                    handleLoadMore();
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) observer.observe(observerTarget.current);
        return () => observer.disconnect();
    }, [isFetchingMore, visibleCount, filteredProducts.length]);

    // Reseta a contagem quando o filtro mudar
    useEffect(() => {
        setVisibleCount(10);
    }, [currentFilters, searchValue]);

    return (
        <Container>
            <h2 className="text-2xl font-bold mb-6">Nossos Produtos</h2>

            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-violet-600"></div>
                </div>
            ) : displayProducts.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {displayProducts.map((item) => (
                            <ProductCard key={item.id} item={item} />
                        ))}
                    </div>


                    <div ref={observerTarget} className="flex flex-col items-center py-10 w-full min-h-[100px]">
                        {isFetchingMore && (
                            <div className="flex flex-col items-center gap-2">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-violet-600"></div>
                                <p className="text-sm text-gray-500">Carregando mais...</p>
                            </div>
                        )}

                        {visibleCount >= filteredProducts.length && (
                            <p className="text-gray-400 italic text-sm">Você chegou ao fim da lista.</p>
                        )}
                    </div>
                </>
            ) : (
                <p className="text-gray-500 italic text-center py-10">
                    Nenhum produto encontrado para os filtros selecionados.
                </p>
            )}
        </Container>
    );
}

export default Product;