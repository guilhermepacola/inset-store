import { useState, useEffect } from "react";
import { productsService } from "../services/api";
import Container from "../components/Container/Container";
import ProductCard from "../components/ui/ProductCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


function Product({ currentFilters, searchValue="" }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getInitialProducts = async () => {

            try {
                setLoading(true)
                const productsDataResponse = await productsService.getAll() //Busca todos os produtos da API
                setProducts(productsDataResponse.data.products) // retorna um objeto com os produtos

            } catch (error) {
                console.error("Erro ao buscar produtos:", error)
            } finally {
                setLoading(false)
            }
        }
        getInitialProducts()
    }, [])

    const filteredProducts = products.filter(product => {
        const matchesCategory = currentFilters.categories.length === 0 ||
            currentFilters.categories.includes(product.category);

        const matchesPrice = product.price <= currentFilters.maxPrice;

        const matchesSearch = product.title
            .toLowerCase()
            .includes((searchValue || "").toLowerCase());

        return matchesCategory && matchesPrice && matchesSearch;
    })
        .sort((a, b) => {

            if (currentFilters.sortBy === 'price-asc') return a.price - b.price;
            if (currentFilters.sortBy === 'price-desc') return b.price - a.price;
            if (currentFilters.sortBy === 'rating') return b.rating - a.rating;
            return a.title.localeCompare(b.title); // Padrão: A-Z
        })
    const groupedProducts = filteredProducts.reduce((categoryGroup, product) => {
        const category = product.category
        if (!categoryGroup[category]) {
            categoryGroup[category] = []
        }
        categoryGroup[category].push(product);
        return categoryGroup;
    }, {})

    const showGrid = currentFilters.categories.length > 0 || searchValue.length > 0;

    return (

        <Container>
            <h2 className="text-2xl font-bold mb-6">Nossos Produtos</h2>

            {loading ? (
                <p>Carregando...</p>
            ) : Object.keys(groupedProducts).length > 0 ? (
                Object.keys(groupedProducts).map((categoryName) => (
                    <section key={categoryName} className="mb-10">

                        {showGrid ? (
                            <>
                                <h3 className="text-xl font-semibold mb-4 capitalize">
                                    {categoryName.replace('-', ' ')}
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                                    {groupedProducts[categoryName].map((item) => (
                                        <ProductCard key={item.id} item={item} />
                                    ))}
                                </div></>
                        ) : (

                            <Swiper
                                spaceBetween={20}
                                slidesPerView={1.2}
                                breakpoints={{
                                    640: { slidesPerView: 2.2 },
                                    1024: { slidesPerView: 4 },
                                }}
                                className="mySwiper"
                            >
                                {groupedProducts[categoryName].map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <ProductCard item={item} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </section>
                ))
            ) : (
                <p className="text-gray-500 italic">Nenhum produto encontrado para os filtros selecionados.</p>
            )}
        </Container>
    )
}
export default Product;