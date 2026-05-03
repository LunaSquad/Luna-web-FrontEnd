import { useState } from "react"
import { Pencil, ThumbsDown, ThumbsUp, Trash2, Users } from "lucide-react"
import InfoHeader from "../../components/escola/InfoHeader"
import LayoutBase from "../../components/escola/layout/LayoutBase"
import SearchActionBar from "../../components/escola/SearchActionBar"
import Table from "../../components/escola/TableInformations"
import ModalTurma from "../modals/ModalTurmas"
import FormTurma from "../../components/escola/FormTurma"
import ModalDelete from "../modals/ModalDelete"

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
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [turmaSelecionado, setTurmaSelecionado] = useState<Turma | null > (null)

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
          <button 
            type="button"
            onClick={() => {
              setTurmaSelecionado(row)
              setModalDeleteOpen(true)
            }}>
            <Trash2 size={20} />
          </button>

          <button type="button" 
            onClick={() => {
            setTurmaSelecionado(row) // envia dados
            setModalAberto(true)
          }}
          >
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
        onButtonClick={() => {
        setTurmaSelecionado(null) // limpa
        setModalAberto(true)
        }}
      />

      <Table columns={columns} data={turmas} />

      <ModalTurma
        isOpen={modalAberto} 
        onClose={() => setModalAberto(false)}
      >
        <div className="logoTurma">
          <Users  size={24}/>
        </div>
        <FormTurma 
          dados={turmaSelecionado}
          onClose={() => setModalAberto(false)}
        />
      </ModalTurma>

      <ModalDelete
        isOpen={modalDeleteOpen}
        onClose={() => setModalDeleteOpen(false)}
        icon={<Users size={30} />}
        title={`Deseja excluir o ${turmaSelecionado?.turma}`}
        decision1={<ThumbsUp size={22}/>}
        decision2={<ThumbsDown size={22} />}
      />

    </LayoutBase>
  )
}

export default Turmas