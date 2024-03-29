import "./styles.scss"
import { useFilters } from "../FilterContextProvider/hooks";
import usePuzzleStore from "@/store/store";


export default function GenreSelection() {
    const  [filters, setFilters] = useFilters()
    const puzzles = usePuzzleStore((state) => state.puzzles)

    const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => { 
        setFilters( (prev) => ({
            ...prev,
            genre: event.target.value 
        })) 
    } 

    const genreOptions = puzzles.reduce(
        (stored, currentPuzzle) => ( !stored.includes(currentPuzzle.genre) ? [...stored, currentPuzzle.genre] : stored), [] as string[])
        
  return (
    <label className="genre-select-wrapper">
        <span>Жанр:</span>
        <select className='genre-select' onChange={onSelectChange} value={filters.genre}>
           
            <option hidden={filters.genre === ""}  value=""> Любой </option>
            {
                genreOptions.map((genre, genreIndex) => (
                    <option hidden={filters.genre === genre} key={genreIndex} value={genre}>{genre}</option>
                ))
            }
        </select>
    </label>
    
  )
}
