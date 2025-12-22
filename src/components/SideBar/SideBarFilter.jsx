import React from 'react'
import Filters from './Filters'

export function SideBarFilter({ filters, onChange }) {
  return (
    <aside className='w-64 p-4 border-r min-h-screen'>
      <Filters
        filters={filters}
        onChange={onChange} />
    </aside>
  )
}

export default SideBarFilter;