import { useState } from "react"
import {GraduationCap, House, Book, Users} from "lucide-react"
import { useNavigate } from 'react-router-dom';
import InfoHeader from "../components/InfoHeader"
import LayoutBase from "../components/layout/LayoutBase"
import NavbarHome from "../components/NavbarHome"
import foto from "../assets/escola.jpg"
import CardHome from "../components/cardsHome"
import Button from "../components/button"
import MeuCalendario from "../components/calendar/MeuCalendario";

function Home() {
  const navigate = useNavigate();

  // Função tipada para lidar com a rota
  const goTo = (path: string): void => {
    navigate(path);
  };
  return (
    <LayoutBase>

      {/* NAVBAR */}
      <NavbarHome
        onSearchChange={() => {}}
        buttonLabel="Filtrar"
        onButtonClickc={() => {}}

        nome="EMEF Prof° Carlos Alberto Vigneron"
        foto={foto}
        notificacoes={5}
        onButtonClick={() => {}}
      >

      </NavbarHome>

      {/* CONTEÚDO */}
      <div className="homeContainer">
        
        {/* CONTEÚDO LADO DIREITO */}

        <div className="homeMain">  
            <div className="cardsPrincipais">
                <CardHome
                  icon={<GraduationCap size={26}/>}
                  title="Alunos"
                  count = {200}
                />

                <CardHome
                  icon={<Book size={26}/>}
                  title="Professores"
                  count = {10}
                />

                <CardHome
                  icon={<Users size={26}/>}
                  title="Turmas Ativas"
                  count = {6}
                />
            </div>

            <div className="atalhosPrincipais">
                <h2>Acesso Rápido</h2>
                <div className="cardsAtalhos">
                    <div className="cardAtl">
                      <div className="iconName">
                        <GraduationCap size={40} />
                      </div>
                      <p className="titleAtalhos">Gerenciar dados de alunos</p>
                      <Button className="btnAtalhos" onClick={() => goTo('/alunos')}>Alunos</Button>
                    </div>

                    <div className="cardAtl">
                      <div className="iconName">
                        <Book size={35} />
                      </div>
                      <p className="titleAtalhos">Administrar corpo docente</p>
                      <Button className="btnAtalhos" onClick={() => goTo('/professores')}>Professores</Button>
                    </div>

                    <div className="cardAtl">
                      <div className="iconName">
                        <Users size={35} />
                      </div>
                      <p className="titleAtalhos">Organize turmas e distribuição de alunos</p>
                      <Button className="btnAtalhos" onClick={() => goTo('/turmas')}>Turmas</Button>
                    </div>
                </div>
            </div>
        </div>

        <div className="homeSide">
            <div className="calendario">
                <MeuCalendario />
            </div>
        </div>

      </div>


    </LayoutBase>
  )
}

export default Home