import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainPage from './app/page';
import Layout from './components/ui/Layout/Layout';
import PuzzlePage from './app/puzzle/[puzzleSlug]/page';
import PuzzleSlugError from './app/puzzle/[puzzleSlug]/error';
import CreatePuzzlePage from './app/createPuzzle/page';
import FavouritesPage from './app/favourites/page';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><MainPage/></Layout>,
  },
  {
    path: "/puzzle/:puzzleSlug",
    element: <Layout><PuzzlePage/></Layout>,
    errorElement: (
      <Layout>
        <PuzzleSlugError/>
      </Layout>
    )
  },
  {
    path: "/createPuzzle",
    element: <Layout><CreatePuzzlePage/></Layout>
  },
  {
    path: "/favourites",
    element: <Layout><FavouritesPage/></Layout>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
