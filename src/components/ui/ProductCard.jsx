import { FiStar } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export function ProductCard({ item }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const { title, thumbnail, price, category, rating, images } = item

  useEffect(() => {
    let interval;
    if (isHovered && images && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 1000); // Troca a imagem a cada 1 segundo
    } else {
      setCurrentImageIndex(0); // Volta para a primeira imagem quando sai o mouse
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isHovered, images]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  return (

    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white border border-gray-100 rounded-xl p-2 md:p-3 shadow-sm hover:shadow-md transition-all group flex flex-col h-full w-full"
    >
      {/* Container da Imagem: aspect-square mantém a proporção sempre correta */}
      <div className="bg-gray-50 rounded-lg overflow-hidden aspect-square flex items-center justify-center p-2 relative">
        <img
          src={images && isHovered ? images[currentImageIndex] : thumbnail}
          alt={title}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
        />

        {/* Rating Badge: Um pouco maior no desktop */}
        <div className="absolute text-[10px] md:text-xs top-2 right-2 bg-white/90 px-1.5 py-0.5 rounded-lg flex items-center gap-1 shadow-sm font-medium">
          <FiStar className='text-amber-500' /> {rating}
        </div>
      </div>

      {/* Informações do produto */}
      <div className="mt-2 md:mt-3 flex flex-col grow">
        <span className="text-[9px] md:text-[10px] uppercase font-bold text-violet-400 leading-none mb-1 md:mb-1.5">
          {category}
        </span>

            <h3 className="text-xs md:text-sm font-semibold text-gray-800 line-clamp-2 leading-tight min-h-10 md:min-h-12">
          {title}
        </h3>

        <div className="mt-auto pt-2 flex flex-col sm:flex-row gap-2 justify-between sm:items-center">
          <span className="text-base font-bold text-gray-900 leading-none">
            {formatCurrency(price)}
          </span>

          <button className="w-full sm:w-auto text-[10px] md:text-xs font-bold flex justify-center items-center gap-1 cursor-pointer bg-violet-100 text-violet-600 px-2 py-1.5 rounded-lg hover:bg-violet-600 hover:text-white transition-colors">
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
