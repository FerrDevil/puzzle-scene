import { useTitle } from "@/hooks/useTitle"
import "./styles.scss"
import { useNavigate } from "react-router"
import FormTextInput from "./_components/Form/FormTextInput/FormTextInput"
import usePuzzleStore from "@/store/store"
import { Puzzle } from "@/store/types"
import FormImageInput from "./_components/Form/FormImageInput/FormImageInput"
import { useEffect, useState } from "react"
import FormSelection from "./_components/Form/FormSelection/FormSelection"

export default function CreatePuzzlePage() {
    
    const navigate = useNavigate()

    const [isSubmitButtonDisabled, setSubmitButtonDisabled] = useState(true)

    const [puzzleInfo, setPuzzleInfo] = useState({
        title: "",
        image: "",
        genre: "",
        difficulty: 0
    })

    const [puzzles, setPuzzles] = usePuzzleStore((state) => [state.puzzles, state.setPuzzles])

    useEffect(
        () => {
            for (let value of Object.values(puzzleInfo)){
                if (typeof value === "string"? value.trim() === '' : !value){
                    setSubmitButtonDisabled(true)
                    return
                }
            }
            setSubmitButtonDisabled(false) 
        }, [puzzleInfo]
    )

    useTitle("Создание паззла | PuzzleScene")


    const onChangePuzzleInfo = (inputName: string) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            setPuzzleInfo(prev => ({...prev, [inputName] : event.target.value}))
        }
    }

    const formSubmitHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault(); 
        event.stopPropagation(); 
        
        const newPuzzle: Puzzle = {
            ...puzzleInfo,
            isFavourited: false,
            favouritedDatetime: null
        }
        setPuzzles([...puzzles, newPuzzle])
        navigate("/") 
    }


    const setImage = (value: string) => {
        setPuzzleInfo(prev => ({...prev, image: value}))
    }

    const onChangeDifficulty = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPuzzleInfo(prev => ({...prev, difficulty : Number(event.target.value)}))
    }
    

    return (
        <main className="main create-puzzle-page-wrapper">
            <h1 className="create-puzzle-page__title">Создание паззла</h1> 
            <div className="create-puzzle-form-wrapper">
                <form onSubmit={ formSubmitHandler} className="create-puzzle-form">
                    <FormTextInput 
                        field="title"
                        placeholder="Название"
                        onChange={onChangePuzzleInfo("title")}
                        isValid={!!puzzleInfo.title}
                        errorMessage={!puzzleInfo.title && "Обязательное поле" || ""}
                    />
                    <FormTextInput 
                        field="genre"
                        placeholder="Жанр"
                        onChange={onChangePuzzleInfo("genre")}
                        isValid={!!puzzleInfo.genre}
                        errorMessage={!puzzleInfo.genre && "Обязательное поле" || ""}
                    />
                    <FormSelection onChange={onChangeDifficulty} />
                    <FormImageInput  setImage={setImage}/>

                    <button className="submit-button" disabled={isSubmitButtonDisabled} type="submit" onSubmit={(event => event.preventDefault())}>
                        Создать
                    </button>
                </form>

            </div>
        </main>
  )
}
