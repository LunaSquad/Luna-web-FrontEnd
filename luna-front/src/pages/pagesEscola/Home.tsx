import { useState } from "react"
import {GraduationCap, House, Book, Users} from "lucide-react"
import { useNavigate } from 'react-router-dom';
import InfoHeader from "../../components/escola/InfoHeader";
import LayoutBase from "../../components/escola/layout/LayoutBase";
import NavbarHome from "../../components/escola/NavbarHome";
import foto from "../../assets/escola.jpg"
import CardHome from "../../components/escola/cardsHome";
import Button from "../../components/escola/button";
import MeuCalendario from "../../components/calendar/MeuCalendario";
import EventsList from "../../components/escola/EventsInput";
import ModalEvents from "../modals/ModalEvents";

interface Evento {
  description: string;
  date: string;
}

function Home() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [events,setEvents] = useState<Evento[]>([
    { description: "Análise de evolução comportamental e acadêmica (Alunos TDAH).", date: "2026-06-06" },
    { description: "Análise de evolução comportamental e acadêmica (Alunos TDA).", date: "2026-06-30" },
    { description: "Análise de evolução comportamental e acadêmica (Alunos TD).", date: "2026-01-24" },
  ])

  // Função tipada para lidar com a rota
  const goTo = (path: string): void => {
    navigate(path);
  };

  const handleSelectDate = (date: Date) => {
    const formatted = date.toLocaleDateString('sv-SE')
    setSelectedDate(formatted)
    setModalOpen(true)
  }

  const handleAddEvent = (description: string, date: string) => {
    const newEvent: Evento = { description, date }
    setEvents((prev) => [...prev, newEvent])
  }

  const handleDeleteEvent = (index: number) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
  };

  console.log("modalOpen:", modalOpen);

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
                <MeuCalendario
                  onSelectDate={handleSelectDate}
                 />
            </div>

            <EventsList
             events={events}
             onDelete={handleDeleteEvent} />
        </div>

      </div>


      <ModalEvents
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddEvent={handleAddEvent}
        dados={{ date: selectedDate }} // 👈 aqui
      />


    </LayoutBase>
  )
}

export default Home