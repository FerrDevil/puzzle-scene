import "../Layout/styles.scss"
import Header from "../Header/Header";

export default function Layout({children}: {children?: React.ReactNode}) {
  return (
    <>
        <Header/>
        {children}
    </>
    
  )
}
