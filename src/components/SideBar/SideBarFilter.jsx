import Filters from './Filters'

export function SideBarFilter({ filters, onChange }) {
  return (
   <aside className='w-full sm:w-40 lg:w-76 h-full bg-white border-none flex flex-col'>
      <div className=" overflow-y-auto p-4 custom-scrollbar">
        <Filters 
          filters={filters}
          onChange={onChange} 
        />
      </div>

      {/* Rodapé da sidebar para mobile */}
      <div className="p-4 border-none lg:hidden">
        <p className="text-[10px] text-gray-400 text-center">
          Role para ver todas as opções
        </p>
      </div>
    </aside>
  )
}

export default SideBarFilter;