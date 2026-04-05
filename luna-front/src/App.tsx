import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"
import Home from "./pages/Home"
import Professores from "./pages/Professores"
import Alunos from "./pages/Alunos"
import Turmas from "./pages/Turmas"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/professores" element={<Professores />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/turmas" element={<Turmas />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App