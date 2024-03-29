import { useEffect, useRef, useState } from "react"


type SidebarPieceProps = { index: number, image: string , difficultySize: [number, number] } & React.HTMLAttributes<HTMLCanvasElement>


export default function SidebarPiece({difficultySize, index, image, onDragStart, onDragEnter, onDragOver, onDrop } : SidebarPieceProps ) {
 
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const [sizes, setSizes] = useState([0, 0])
	const imageRef = useRef<HTMLImageElement>(null)
	
	
	
	useEffect(() => {
		if(!imageRef || !imageRef.current) return
		setSizes([imageRef.current.width / difficultySize[0], imageRef.current.height / difficultySize[1]])
	}, [])
	
	

	useEffect(() => {
		if (sizes[0] === 0 && sizes[1] === 0) return
		if (!imageRef.current) return
		const ctx = canvasRef.current!.getContext("2d")
		if (!ctx) return
		
		const imageCuts = [
			(index % difficultySize[0]) * sizes[0]  , Math.floor(index / difficultySize[0]) * sizes[1] ,   
			sizes[0] ,  sizes[1]
		] as const
		
		ctx.drawImage(imageRef.current, 
			...imageCuts,  
			0, 0,     
			sizes[0], sizes[1])
		
	}, [sizes])
    return (
		<>
			{<img ref={imageRef} src={image} alt="canvasHelper" style={{display: "none"}}/>}
			<canvas className="pieces-sidebar__piece" draggable width={sizes[0]} height={sizes[1]}  ref={canvasRef} onDragStart={onDragStart} onDragEnter={onDragEnter} onDragOver={onDragOver} onDrop={onDrop}/>
		</>
      	
    )
}
