import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/Home.page.tsx";
import HeaderComponent from "./components/header/Header.component.tsx";

export default function App() {
  return (
    <>
      <HeaderComponent/>
      <main className={"mx-auto container"}>
        <Routes>
          <Route path={'/'} element={<HomePage/>}/>
        </Routes>
      </main>
    </>
  )
}