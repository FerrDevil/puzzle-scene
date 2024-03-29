import usePuzzleStore from "@/store/store"
import "./styles.scss"

import FilledFavouriteSVG  from "./assets/filled-favorite.svg?react"
import FavouriteSVG  from "./assets/favorite.svg?react"
import { useMemo } from "react"

export default function FavouriteButton({puzzleTitle} : {puzzleTitle: string}) {
    const [puzzles, setPuzzles] = usePuzzleStore(state => [state.puzzles, state.setPuzzles])

    const toggleFavouritePuzzle = () => {
        const newPuzzles = puzzles.map(puzzle => 
            puzzle.title === puzzleTitle ?
                {
                    ...puzzle,
                    isFavourited: !puzzle.isFavourited,
                    favouritedDatetime: puzzle.isFavourited ?
                        null
                    :
                        Date.now()
                }
            : 
                puzzle)

        setPuzzles(newPuzzles)
    }

    const isFavourited = useMemo(() => puzzles.find(puzzle => puzzle.title === puzzleTitle)?.isFavourited, [puzzles])
    return (
        <button className={`favourited-button ${ isFavourited ? "favourited-button--favourited": "" }`} onClick={toggleFavouritePuzzle}>
            {
                isFavourited ?
                    <FilledFavouriteSVG /> 
                :
                    <FavouriteSVG/>
            }
        </button>
    )
}
