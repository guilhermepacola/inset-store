import axios from 'axios'

const api = axios.create({
    baseURL: 'https://dummyjson.com/'
});

export const productsService = {
    getAll: () => api.get('products?limit=0'),
    getById: (id)=> api.get(`products/${id}`),
    getCategoryList: () => api.get('products/category-list'),
    getByCategory: (cat)=> api.get(`products/category/${cat}`),
    search:(query)=> api.get(`products/search?q=${query}`)
}