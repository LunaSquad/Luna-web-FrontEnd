import { useState } from "react"
import {GraduationCap, House} from "lucide-react"
import InfoHeader from "../components/InfoHeader"
import LayoutBase from "../components/layout/LayoutBase"
import NavbarHome from "../components/NavbarHome"
import foto from "../assets/escola.jpg"
import CardHome from "../components/cardsHome"

function Home() {
  return (
    <LayoutBase>

      {/* NAVBAR */}
      <NavbarHome
        searchValue=""
        onSearchChange={() => {}}
        buttonLabel="Filtrar"
        onButtonClick={() => {}}

        nome="EMEF Prof° Carlos Alberto Vigneron"
        foto={foto}
        notificacoes={5} // 👈 TESTE AQUI
      >

      </NavbarHome>

      {/* CONTEÚDO */}
      <div className="homeContainer">
        
        {/* CONTEÚDO LADO DIREITO */}

        <div className="homeMain">
            <CardHome
              icon={<GraduationCap size={26}/>}
              title="Alunos"
              count = {200}
            />
        </div>

        <div className="homeSide">
            appapa
        </div>

      </div>


    </LayoutBase>
  )
}

export default Home