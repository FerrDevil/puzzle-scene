export type Puzzle = {
    title: string,
    image: string,
    genre: string,
    difficulty: number,
    isFavourited: boolean,
    favouritedDatetime: number | null
}

export type StoreState = {
    puzzles: Puzzle[],
    
}
export type StoreAction = {
    setPuzzles: (newPuzzles: Puzzle[]) => void,
    
}


