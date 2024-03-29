import { useContext } from "react"
import { FilterContext } from "./FilterContextProvider"

export const useFilters = () => {
    return useContext(FilterContext)
}