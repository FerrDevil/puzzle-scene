import { Link } from "react-router-dom";
import "./styles.scss"
import PuzzleSVG  from "./assets/puzzle.svg?react"
import FilledFavouriteSVG  from "./assets/filled-favorite.svg?react"
import AddSVG  from "./assets/add.svg?react"


export default function Header() {
  return (
    <header className="header">
      	<nav className="navbar">
			<Link className="logo-link" to="/">
				<div className="logo-wrapper">
					<PuzzleSVG className="logo"/>
				</div>
				<span className="logo-name">
					Puzzle Scene
				</span>
				
			</Link>
			<ul className="navbar-link-list">
				<li>
					<Link className="favourites-link" to="/favourites">
						<FilledFavouriteSVG/>
					</Link>
				</li>
				<li>
					<Link className="add-link" to="/createPuzzle">
						<AddSVG/>
					</Link>
				</li>
				
				
			</ul>
			

			
      	</nav>
    </header>
    
  )
}
