import { useState } from "react"
import { Pencil, Trash2, Users } from "lucide-react"
import InfoHeader from "../components/InfoHeader"
import LayoutBase from "../components/layout/LayoutBase"
import SearchActionBar from "../components/SearchActionBar"
import Table from "../components/TableInformations"
import ModalTurma from "./modals/ModalTurmas"
import FormTurma from "../components/FormTurma"

type Turma = {
  id: number;
  turma: string;
  profResponsavel: string;
  alunos: number
  icon: React.ReactNode;
};

const turmas: Turma[] = [
  {
    id: 1,
    turma: "3°A",
    profResponsavel:"Ronaldo Ferreira",
    alunos: 10,
    icon: <Users size={18}/>,
  },
  {
    id: 2,
    turma: "1°A",
    profResponsavel:"Olivia Silva",
    alunos: 2,
    icon: <Users size={18}/>,
  },
  {
    id: 3,
    turma: "1°A",
    profResponsavel:"Anastasia Oliveira",
    alunos: 5,
    icon: <Users size={18}/>,
  },
];


function Turmas() {
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

  const columns = [
    {
      header: "Turma",
      accessor: "turma",
      render: (row: Turma) => (
        <div className="cellNome">
          <div className="iconeTurma">{row.icon}</div>
          <span>{row.turma}</span>
        </div>
      ),
    },
    {
      header: "Professor Responsável",
      accessor: "profResponsavel",
      render: (row: Turma) => (
        <span className="cellProf">{row.profResponsavel}</span>
      ),
    },
    {
      header: "Alunos",
      accessor: "alunos",
      render: (row: Turma) => (
        <span className="alunoBadge">{row.alunos}</span>
      ),
    },
    {
      header: "Ações",
      accessor: "acoes",
      render: (row: Turma) => (
        <div className="acoesCell">
          <button type="button" onClick={() => console.log("Excluir", row.id)}>
            <Trash2 size={20} />
          </button>

          <button type="button" onClick={() => console.log("Editar", row.id)}>
            <Pencil size={20} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <LayoutBase>

      <InfoHeader
        icon={<Users size={26}/>}
        title="Turmas"
        subtitle="Organizar turmas e distribuição de alunos"
      />

      <SearchActionBar
        searchValue={busca}
        onSearchChange={setBusca}
        searchPlaceholder="Buscar Turma"
        buttonLabel="Nova Turma"
        onButtonClick={() => setModalAberto(true)}
      />

      <Table columns={columns} data={turmas} />

      <ModalTurma
        isOpen={modalAberto} 
        onClose={() => setModalAberto(false)}
      >
        <div className="logoTurma">
          <Users  size={24}/>
        </div>
        <FormTurma />
      </ModalTurma>

    </LayoutBase>
  )
}

export default Turmas