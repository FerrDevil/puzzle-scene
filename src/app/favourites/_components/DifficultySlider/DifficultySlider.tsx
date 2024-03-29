
import { useFilters } from "../FilterContextProvider/hooks"

import "./styles.scss"

const difficulties = [
    {
        value: 0,
        text: "Любая"
    },
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

export default function DifficultySlider() {
    const  [filters, setFilters] = useFilters()

    

    const chosenDifficultyIndex = difficulties.findIndex( (difficulty) => difficulty.value === filters.difficulty )

    const onDifficultyChange: React.ChangeEventHandler<HTMLInputElement> = ( event ) => {
        setFilters((prev) => (
            {
                ...prev,
                difficulty: difficulties.find( ( _, difficultyIndex ) => difficultyIndex === Number(event.target.value) )?.value || 0
            }
        )
        )
    }

    const difficultiesDescriptions = ["Любая", "Легкая", "Средняя", "Сложная"]

    return (
        <label className="difficulty-slider-wrapper">
            <span>Сложность:</span>
            <input className="difficulty-slider" type="range"  value={chosenDifficultyIndex}  max={ difficultiesDescriptions.length - 1 } min={0} step={1} onChange={onDifficultyChange}/>
            <span>{difficultiesDescriptions[chosenDifficultyIndex]}</span>
        </label>
    )
}
