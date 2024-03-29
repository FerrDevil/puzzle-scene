import "./styles.scss"


export default function FormSelection({ onChange }: { onChange : (event:any) => void }) {
   

    const onSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => { 
        onChange(event)
    } 

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
    <label className="genre-select-wrapper">
        <span>Жанр:</span>
        <select className='genre-select' onChange={onSelectChange}>
            <option hidden value=""> Выберите сложность </option>
            {
                difficulties.map((difficulty, difficultyIndex) => (
                    <option key={difficultyIndex} value={difficulty.value}>{difficulty.text}</option>
                ))
            }
        </select>
    </label>
    
  )
}
