import { create } from 'zustand'
import { StoreState, StoreAction } from './types'

const usePuzzleStore = create<StoreState & StoreAction>(
    (set) => (
        {
           puzzles: [
            {
                title: "Cyberpunk",
                image: "/images/img1.jpg",
                genre: "Игры",
                difficulty: 10,
                isFavourited: false,
                favouritedDatetime: null
            },
            {
                title: "DMC",
                image: "/images/img3.jpg",
                genre: "Не игры",
                difficulty: 16,
                isFavourited: false,
                favouritedDatetime: null
            }
           ],
           setPuzzles: (newPuzzles) => set({puzzles: newPuzzles})
        }
    )
)

export default usePuzzleStore