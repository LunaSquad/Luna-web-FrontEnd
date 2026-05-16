import { useState, useEffect } from "react"
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
  alunos: number;
  icon: React.ReactNode;
};

const token = localStorage.getItem("token")

async function fetchTurmas(): Promise<Turma[]> {
  const response = await fetch("https://sua-api.com/turmas", {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error("Erro ao carregar turmas")
  return response.json()
}

async function deletarTurma(id: number) {
  const response = await fetch(`https://sua-api.com/turmas/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error("Erro ao deletar turma")
}

function Turmas() {
  const [turmas, setTurmas] = useState<Turma[]>([])
  const [busca, setBusca] = useState("")
  const [modalAberto, setModalAberto] = useState(false)
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)
  const [turmaSelecionado, setTurmaSelecionado] = useState<Turma | null>(null)

  useEffect(() => {
    fetchTurmas()
      .then(setTurmas)
      .catch((err) => console.error(err.message))
  }, [])

  const turmasFiltradas = turmas.filter((t) =>
    t.turma.toLowerCase().includes(busca.toLowerCase()) ||
    t.profResponsavel.toLowerCase().includes(busca.toLowerCase())
  )

  async function handleDeletar() {
    if (!turmaSelecionado) return

    setTurmas((prev) => prev.filter((t) => t.id !== turmaSelecionado.id))
    setModalDeleteOpen(false)

    try {
      await deletarTurma(turmaSelecionado.id)
    } catch (err) {
      console.error(err)
      fetchTurmas().then(setTurmas)
    }
  }

  function handleSalvo() {
    setModalAberto(false)
    fetchTurmas().then(setTurmas)
  }

  const columns = [
    {
      header: "Turma",
      accessor: "turma",
      render: (row: Turma) => (
        <div className="cellNome">
          <div className="iconeTurma"><Users size={18}/></div>
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

          <button
            type="button"
            onClick={() => {
              setTurmaSelecionado(row)
              setModalAberto(true)
            }}
          >
            <Pencil size={20} />
          </button>
        </div>
      ),
    },
  ]

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
          setTurmaSelecionado(null)
          setModalAberto(true)
        }}
      />

      <Table columns={columns} data={turmasFiltradas} />

      <ModalTurma
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      >
        <div className="logoTurma">
          <Users size={24}/>
        </div>
        <FormTurma
          dados={turmaSelecionado}
          onClose={() => setModalAberto(false)}
          onSalvo={handleSalvo}
        />
      </ModalTurma>

      <ModalDelete
        isOpen={modalDeleteOpen}
        onClose={() => setModalDeleteOpen(false)}
        icon={<Users size={30} />}
        title={`Deseja excluir a turma ${turmaSelecionado?.turma}`}
        decision1={<ThumbsUp size={22}/>}
        decision2={<ThumbsDown size={22} />}
        onConfirm={handleDeletar}
      />

    </LayoutBase>
  )
}

export default Turmas