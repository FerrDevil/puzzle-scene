import { useState } from "react"

import { DefaultFormInputProps } from "../types"

export default function FormTextInput({ onChange, placeholder, isValid=true, errorMessage="" }: DefaultFormInputProps ) {
    const [isChanged, setChanged] = useState(false)


    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setChanged(true)
        onChange(event)
    }
    return (
        <div className="text-input-wrapper">
            <input type="text" className="text-input" onChange={changeHandler} placeholder={placeholder}/>
            <span className="text-input__error">
                {isChanged && !isValid && errorMessage}
            </span>
            
        </div>
       
    )
}
