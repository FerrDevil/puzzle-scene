import usePuzzleStore from "@/store/store"
import { useParams } from "react-router"
import type { Puzzle } from "@/store/types"
import { useEffect, useRef, useState } from "react";
import SidebarPiece from "./_components/PiecesSidebar/SidebarPiece";
import FavouriteButton from "./_components/FavouriteButton/FavouriteButton";
import { useTitle } from "@/hooks/useTitle";
import shuffleArray from "./utils";
import BoardPiece from "./_components/BoardPiece/BoardPiece";

const difficultySizes: {
    [key: string] : [number, number],
} = {
    "10": [5 , 2],
    "16": [4 , 4],
    "25": [5 , 5],
}



export default function PuzzlePage() {
    const { puzzleSlug } = useParams()
    const puzzles = usePuzzleStore((state) => state.puzzles)

    const currentPuzzle: Puzzle | undefined = puzzles.find((puzzle) => puzzle.title === puzzleSlug)
    
    const piecesArray = [...Array.from({length: Number(currentPuzzle?.difficulty)}).keys()]

    const [pieces, setPieces] = useState(piecesArray.map(pieceIndex => ({ id: pieceIndex, isDropped: false})) )

    const [sidebarPieces, setSidebarPieces] = useState(shuffleArray(pieces))

    const [ draggedPiece, setDraggedPiece ] = useState<number | null>(null)

    const imgRef = useRef<HTMLImageElement>(null)

    const [imageSizes, setImageSizes] = useState<[number, number]>([0, 0])

    const dragStartHandle = (index: number) => {
        return () => {
            setDraggedPiece(index) 
        }
    }

    

    const dropHandle = (index: number) => {
        
        return (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault()
            
            if (draggedPiece !== index) return
            setPieces((prev) => {
                return prev.map((piece) => piece.id === index ? {...piece, isDropped: true} : piece)
            })

            setSidebarPieces(prev => prev.filter(piece => piece.id !== index)) 
        }
    }

    useEffect(() => {
        if(!imgRef.current) return
        setImageSizes([imgRef.current.width, imgRef.current.height])
    }, [])

    useTitle(`${currentPuzzle?.title} | PuzzleScene`)

    if(!currentPuzzle){
        throw Error("Такого паззла не существует")
    }
    const difficultySize = difficultySizes[ Number(currentPuzzle.difficulty).toString() ]

    return (
        <main className="main puzzle-page-wrapper">
            <div className="puzzle-page__heading">
                <h1 className="puzzle__title"> {currentPuzzle.title} </h1>
                <FavouriteButton puzzleTitle={currentPuzzle.title}/>
            </div>
            
            <section className="puzzle__game">
                <section className="puzzle__board" style={{gridTemplateColumns: `repeat(${difficultySize[0]}, 1fr)`, aspectRatio: `${imageSizes[0]}/ ${imageSizes[1]}`}}>
                    <img ref={imgRef} src={currentPuzzle.image} className="puzzle__ref-img" draggable={false}/>
                    {
                        pieces.map((piece) => (
                            <BoardPiece difficultySize={difficultySize} key={piece.id} piece={piece} currentPuzzle={currentPuzzle} dropHandle={dropHandle} imageSizes={imageSizes} imageRef={imgRef}/>
                        ))
                    } 
                </section>

                <aside className="puzzle__pieces-sidebar">
                   {
                        sidebarPieces.map(piece => (
                            <SidebarPiece
                                difficultySize={difficultySize}
                                key={piece.id} 
                                image={currentPuzzle.image} 
                                index={piece.id}
                
                                onDragStart={dragStartHandle(piece.id)}
                            />
                        ))
                    }
                </aside>
            </section>
            
        </main>
    )
}

/*
<div data-index={pieceIndex} key={pieceIndex} className="pieces-sidebar__piece" draggable onDrag={dragHandle}  onDragStart={dragStartHandle} onDragEnter={(event) => event.preventDefault()} onDragOver={(event) => event.preventDefault()}
                                style={{clipPath: `polygon(${(pieceIndex % 5) / 5 * 100}% ${Math.floor(pieceIndex/ 5) * 50}%, ${(pieceIndex % 5) / 5 * 100 + 20}% ${Math.floor(pieceIndex/ 5) * 50}%, ${(pieceIndex % 5) / 5 * 100 + 20}% ${Math.floor(pieceIndex/ 5) * 50 + 50}%, ${(pieceIndex % 5) / 5 * 100}% ${Math.floor(pieceIndex/ 5) * 50 + 50}%)`}}
                            /> 
 */
