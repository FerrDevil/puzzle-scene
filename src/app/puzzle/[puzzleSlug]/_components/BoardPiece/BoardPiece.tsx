import { Puzzle } from "@/store/types";
import { useEffect, useRef, useState } from "react";


export default function BoardPiece({difficultySize, imageRef, imageSizes, currentPuzzle, piece, dropHandle}: {difficultySize: [number, number], imageRef: React.RefObject<HTMLImageElement>, imageSizes: [number, number], currentPuzzle: Puzzle, piece: { id: number, isDropped: boolean}, dropHandle : (index: number) => (event: React.DragEvent<HTMLDivElement>) => void}) {


    const canvasRef = useRef<HTMLCanvasElement>(null)
	const sizes = [imageSizes[0] / difficultySize[0], imageSizes[1] / difficultySize[1] ]
    const [initialSizes, setInitialSizes] = useState<[number, number]>([0, 0])
	
	useEffect(() => {
		const image = new Image()
        image.src = currentPuzzle.image
        image.onload = () => {
            setInitialSizes([image.width / difficultySize[0], image.height / difficultySize[1]])
        }
	}, [currentPuzzle])
	
	
    
	useEffect(() => {
		if (sizes[0] === 0 && sizes[1] === 0) return
		if (!imageRef.current) return
		const ctx = canvasRef.current?.getContext("2d")
		if (!ctx) return

        const index = piece.id
		
		const imageCuts = [
			(index % difficultySize[0]) * initialSizes[0], Math.floor(index / difficultySize[0]) * initialSizes[1] ,   
			initialSizes[0] ,  initialSizes[1]
		] as const
	
		ctx.drawImage(imageRef.current, 
			...imageCuts,  
			0, 0,     
			sizes[0], sizes[1])
		
	}, [sizes])

    
  return (
   <div className="puzzle-board__piece-slot" style={{ aspectRatio: `${sizes[0]} / ${sizes[1]}`}} onDragStart={(event) => event.preventDefault()} onDragEnter={(event) => event.preventDefault()} onDragOver={(event) => event.preventDefault()} onDrop={dropHandle(piece.id)}>
        { 
            piece.isDropped && (
                <canvas  className="puzzle-board__piece"  width={sizes[0]} height={sizes[1]}  ref={canvasRef}/>
                
            )   
        }
        
        </div>
    
  )
}