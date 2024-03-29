import usePuzzleStore from "@/store/store"
import "./styles.scss"
import { useFilters } from "../FilterContextProvider/hooks"
import { Link } from "react-router-dom"


export default function FilteredPuzzles() {
    const puzzles = usePuzzleStore((state) => state.puzzles)
    const [filters] = useFilters() 

    const filteredPuzzles = puzzles
        .filter(puzzle => filters.genre === "" || puzzle.genre === filters.genre)
        .filter(puzzle => filters.difficulty === 0 || puzzle.difficulty === filters.difficulty)
    const difficulties = [
        {
            value: 10,
            text: "Легкая"
        },
        {
            value: 16,
            text: "Средняя"
        },
        {
            value: 25,
            text: "Сложная"
        }
    ]
    return (
        <>
            {
                filteredPuzzles.length === 0 && <span className="not-found-message"> По заданным критериям не найдено ни одного паззла</span>
            }
       
            <section className="filtered-puzzles-wrapper">
                {
                    filteredPuzzles.map((puzzle, puzzleIndex) => (
                        <Link to={`/puzzle/${puzzle.title}`} className="filtered-puzzle" key={puzzleIndex}>
                            <div className="filtered-puzzle__image-wrapper">
                                <img className="filtered-puzzle__image" src={puzzle.image} alt="Puzzle Image"/>
                            </div>

                            <span className="filtered-puzzle__genre">{puzzle.genre}</span>
                            <span className="filtered-puzzle__difficulty">{ difficulties.find( difficulty => difficulty.value === puzzle.difficulty )?.text }</span>
                            
                            <div>
                                <span className="filtered-puzzle__title">{puzzle.title}</span>
                                
                            </div>
                        </Link>
                    ))
                }

            
                
            </section>
        </>
    )
}
