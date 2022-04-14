import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import Home from "./components/Home"
import VideogameCreate from "./components/VideogameCreate"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/create" element={<VideogameCreate />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
