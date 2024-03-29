import './styles.scss'
import FilterContextProvider from './_components/FilterContextProvider/FilterContextProvider'
import GenreSelection from './_components/GenreSelection/GenreSelection'
import FilteredPuzzles from './_components/FilteredPuzzles/FilteredPuzzles'
import DifficultySlider from './_components/DifficultySlider/DifficultySlider'
import { useTitle } from '@/hooks/useTitle'




export default function MainPage() {
	
	useTitle("PuzzleScene")
  	return (
		<FilterContextProvider>
			<main className='main main-page-wrapper'>
				<h1 className='main-page-title'>Вce паззлы</h1>
				<section className='filter-wrapper'>
					<form className='filter-form'>
						<DifficultySlider/>
						<GenreSelection/>
					</form>
				</section>
				
				<FilteredPuzzles/>
				

			</main>
		</FilterContextProvider>
  	)
}
