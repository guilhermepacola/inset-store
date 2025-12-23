import { useState } from "react";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { FiUser, FiStar, FiShoppingCart, FiShoppingBag } from 'react-icons/fi';
import { FaChevronDown } from 'react-icons/fa';
import Container from '../Container/Container';
import { Link } from "react-router-dom";


function Header({ onSearch }) {
    const [searchText, setSearchText] = useState("")
    const bottomNavigation = [
        { title: "Home" },
        { title: "Shop" },
        { title: "Cart" },
        { title: "Orders" },
        { title: "My Account" },
        { title: "Blog" },
    ];

    //atualiza o componente local e global
    const handleSearch = (inputValue) => {
        setSearchText(inputValue.target.value);
    };

    const handleTriggerSearch = () => {
        if (onSearch) {
            onSearch(searchText);
        }
    };

    // envia a busca ao pressionar enter
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleTriggerSearch();
        }
    };

    const clearSearch = () => {
        setSearchText("");
        if (onSearch) onSearch("");
    };
    return (
        <div className="w-full">
            <div className="max-w-395 sm:mx-auto lg:mx-32 h-20 flex items-center justify-between p-2 md:px-4 lg:px-0">
                <Link to={"/"}> <img src="./header-logo.png" alt="Logo inset Store" className={`w-30 md:w-44 cursor-pointer`} /></Link>

                {/*Barra de Pesquisa*/}
                <div className={` md:inline-flex sm:min-w-20 lg:w-5xl relative`}>
                    <input type="text"
                        onChange={(inputValue) => handleSearch(inputValue)}
                        onKeyDown={handleKeyDown}
                        value={searchText}

                        className={`lg:w-full sm:w-40 flex-1 text-violet-500 rounded-full 
                         placeholder:text-base placeholder:tracking-wide placeholder:text-violet-300
                         shadow-sm ring-2 ring-inset ring-violet-400
                         outline-none focus:text-violet-600 focus:ring-violet-600 focus:ring-2
                         px-3 py-1 cursor-pointer`} placeholder="Pesquisar um Produto" />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                        {searchText ? (
                            <IoClose onClick={clearSearch}
                                className={`text-xl text-violet-500 hover:text-red-300 cursor-pointer duration-200`} />) :
                            (<IoSearchOutline onClick={handleTriggerSearch} className={` cursor-pointer text-xl text-violet-400 `} />)}
                    </div>
                </div>

                {/*Menubar */}
                <div className="flex items-center gap-2 md:gap-6 text-xl md:text-2xl ">
                    <FiUser className={` text-violet-400 hover:text-violet-600 duration-200 cursor-pointer`} />
                    <div className="relative cursor-pointer">
                        <FiStar className={`text-violet-400 hover:text-violet-600 duration-200 cursor-pointer`} />
                        <span className={`inline-flex items-center justify-center 
                        bg-red-500 text-amber-100 
                        absolute -bottom-1 -right-1
                        text-[9px] rounded-full w-3 h-3`}>0</span>
                    </div>

                    <div className="relative cursor-pointer">
                        <FiShoppingBag className={`text-violet-400 hover:text-violet-600 duration-200 cursor-pointer`} />
                        <span className={`inline-flex items-center justify-center 
                        bg-red-500 text-amber-100 
                        absolute -bottom-1 -right-1
                        text-[9px] rounded-full w-3 h-3`}>0</span>
                    </div>
                </div>
            </div>

            {/*Barra de Navegação */}
            <div className="w-full bg-violet-400 text-white">
                <Container className={`py-2 max-w-5xl flex items-center justify-between gap-2  `}>
                    {
                        bottomNavigation.map(({ title }) => (
                            <Link key={title} className={` md:inline-flex text-base font-semibold 
                            cursor-pointer overflow-hidden group hover:text-white duration-200 relative `}>

                                {title}

                                <span className={`inline-flex w-full h-[0.5px] bg-white absolute bottom-0 left-0
                                 transform -translate-x-[105%] group-hover:translate-x-0 duration-300`} />
                            </Link>
                        ))
                    }
                </Container>
            </div>
        </div>

    )
}

export default Header;