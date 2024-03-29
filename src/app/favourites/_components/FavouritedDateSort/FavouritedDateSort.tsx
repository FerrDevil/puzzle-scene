import { useFilters } from "../FilterContextProvider/hooks"
import AscendSortSVG from "./assets/ascend-sort.svg?react" 
import "./styles.scss"

export default function FavouritedDateSort() {
    const [filters, setFilters] = useFilters()


    const clickHandle: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault()
        setFilters(prev => (
            {
                ...prev,
                favouritedDateSort: prev.favouritedDateSort === "ascend" ? "descend": "ascend"
            }
        ))
    }
    return (
        <div className="sort-button-wrapper">
            
            <button className="sort-button" onClick={clickHandle}>
                <AscendSortSVG style={{transform: `scaleY(${filters.favouritedDateSort === "ascend" ? "1" : "-1" })` }}/>
            </button>
        </div>
    )
}
