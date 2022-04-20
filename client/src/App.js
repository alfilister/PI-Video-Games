import { BrowserRouter, Routes, Route } from "react-router-dom"
import LandingPage from "./routes/LandingPage"
import Home from "./routes/Home"
import VideogameCreate from "./routes/VideogameCreate"
import Detail from "./routes/Detail"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/create" element={<VideogameCreate />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
