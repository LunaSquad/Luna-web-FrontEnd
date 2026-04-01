import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App