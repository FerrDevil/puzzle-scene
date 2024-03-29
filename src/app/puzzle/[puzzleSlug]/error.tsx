import "./styles.scss"

import { useRouteError } from 'react-router'

export default function PuzzleSlugError() {
    const error = useRouteError() as Error
    return (
        <div className="error-wrapper">
            <h1 className="error__status"> 404 </h1>
            <span className="error__message"> {error.message} </span>
        </div>
    )
}
