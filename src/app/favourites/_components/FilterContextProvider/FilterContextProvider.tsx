import React, { useState } from 'react'
import { Filters } from '../../types'
import { createContext } from 'react'


const filters: Filters = {
  	genre: "",
  	difficulty: 0,
	favouritedDateSort: "ascend"
}

export const FilterContext = createContext<[Filters, React.Dispatch<React.SetStateAction<Filters>> |( () => void)]>([
	filters,
	() => {}
])


export default function FilterContextProvider({children}: {children: React.ReactNode}) {

    const [filterContext, setFilterContext] = useState<Filters>(filters)
    return (
      	<FilterContext.Provider value={[ filterContext, setFilterContext ]}>
        	{ children }
    	</FilterContext.Provider>
  	)
}


