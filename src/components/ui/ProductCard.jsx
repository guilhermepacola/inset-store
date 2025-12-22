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
  console.log(item)
  return (

    <div onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-all group flex flex-col h-full max-w-48">

      <div className="bg-gray-50 rounded-lg overflow-hidden h-32 flex items-center justify-center p-2 relative">
        <img
          src={images && isHovered ? images[currentImageIndex] : thumbnail}
          alt={title}
          className="max-h-full object-contain group-hover:scale-105 transition-transform"
        />

        <div className="absolute text-xs top-2 right-1 bg-white/90 px-1
         py-0.5 rounded-lg flex items-center gap-1 shadow-sm">
          <FiStar className='text-amber-500 text-xs' /> {rating}
        </div>
      </div>

      {/* Informaçoes do produtos */}
      <div className="mt-3 flex flex-col grow">
        <span className="text-[7px] uppercase font-bold text-violet-400 leading-none mb-1.5">
          {category}
        </span>

        <h3 className="text-xs font-semibold text-gray-800 line-clamp-2 trun leading-tight min-h-5">
          {title}
        </h3>

        <div className=" pt-1 flex justify-between items-center">
          <span className="text-sm font-bold leading-none  text-gray-900">{formatCurrency(price)}</span>
          <button className=" text-sm flex gap-1 items-center cursor-pointer bg-violet-100 text-violet-600 p-1 rounded-lg hover:bg-violet-600 hover:text-white transition-colors">Comprar

          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;
