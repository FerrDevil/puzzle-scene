import { useEffect, useState } from "react"


export default function FormImageInput({ setImage}: { setImage: (value: string) => void}) {
    const [file, setFile] = useState<File | null>(null)
    const [sizes, setSizes] = useState([16, 9])
    
    useEffect(() => {
        if(!file) return
        const image = new Image()
        image.src = URL.createObjectURL(file)
        image.onload = () => {
            setSizes([image.width, image.height])
        }
    }, [file])
    
    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const newImageFile = event.target.files![0]
        if (!newImageFile) {
            setImage("")
            return
        }
        setFile(newImageFile)
        const imagePath = URL.createObjectURL(newImageFile)
        setImage(imagePath)
    }
    return (
        <label className="image-input-wrapper" style={{aspectRatio: `${sizes[0]} / ${sizes[1]}`}}>
            <input type="file" className="image-input" onChange={changeHandler} accept="image/*"/>
            <span className="image-input-label__text">
                Выберите файл
            </span>
            { file && <img className="image-input__preview-img" draggable={false} src={ URL.createObjectURL(file) } alt="Image preview"/> }
        </label>
        
    )
}
