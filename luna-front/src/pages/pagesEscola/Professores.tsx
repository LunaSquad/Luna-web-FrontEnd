import { useState, useEffect } from "react"
import { Pencil, Trash2, Book, ThumbsUp, ThumbsDown } from "lucide-react"
import InfoHeader from "../../components/escola/InfoHeader"
import LayoutBase from "../../components/escola/layout/LayoutBase"
import SearchActionBar from "../../components/escola/SearchActionBar"
import Table from "../../components/escola/TableInformations"
import ModalProf from "../modals/ModalProf"
import FormProfessores from "../../components/escola/FormProfessor"
import ModalDelete from "../modals/ModalDelete"

type Professor = {
  id: number;
  nome: string;
  email: string;
  foto: string;
};

const token = localStorage.getItem("token")

async function fetchProfessores(): Promise<Professor[]> {
  const response = await fetch("https://sua-api.com/professores", {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error("Erro ao carregar professores")
  return response.json()
}

async function deletarProfessor(id: number) {
  const response = await fetch(`https://sua-api.com/professores/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error("Erro ao deletar professor")
}

function Professores() {
  const [professores, setProfessores] = useState<Professor[]>([])
  const [busca, setBusca] = useState("")
  const [modalAberto, setModalAberto] = useState(false)
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)
  const [professorSelecionado, setProfessorSelecionado] = useState<Professor | null>(null)

  // busca lista ao montar
  useEffect(() => {
    fetchProfessores()
      .then(setProfessores)
      .catch((err) => console.error(err.message))
  }, [])

  // filtra localmente pela busca
  const professoresFiltrados = professores.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase()) ||
    p.email.toLowerCase().includes(busca.toLowerCase())
  )

  async function handleDeletar() {
    if (!professorSelecionado) return

    setProfessores((prev) => prev.filter((p) => p.id !== professorSelecionado.id))
    setModalDeleteOpen(false)

    try {
      await deletarProfessor(professorSelecionado.id)
    } catch (err) {
      console.error(err)
      fetchProfessores().then(setProfessores)
    }
  }

  function handleSalvo() {
    setModalAberto(false)
    fetchProfessores().then(setProfessores) 
  }

  const columns = [
    {
      header: "Nome",
      accessor: "nome",
      render: (row: Professor) => (
        <div className="cellNome">
          <img src={row.foto} alt={row.nome} className="fotoPessoa" />
          <span>{row.nome}</span>
        </div>
      ),
    },
    {
      header: "E-mail",
      accessor: "email",
      render: (row: Professor) => (
        <span className="emailBadge">{row.email}</span>
      ),
    },
    {
      header: "Ações",
      accessor: "acoes",
      render: (row: Professor) => (
        <div className="acoesCell">
          <button
            type="button"
            onClick={() => {
              setProfessorSelecionado(row)
              setModalDeleteOpen(true)
            }}>
            <Trash2 size={20} />
          </button>

          <button
            type="button"
            onClick={() => {
              setProfessorSelecionado(row)
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
        icon={<Book size={26}/>}
        title="Professores"
        subtitle="Administrar Corpo Docente"
      />

      <SearchActionBar
        searchValue={busca}
        onSearchChange={setBusca}
        searchPlaceholder="Buscar Professor"
        buttonLabel="Novo Professor"
        onButtonClick={() => {
          setProfessorSelecionado(null)
          setModalAberto(true)
        }}
      />

      <Table columns={columns} data={professoresFiltrados} />

      <ModalProf
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      >
        <div className="logoProf">
          <Book size={24}/>
        </div>
        <FormProfessores
          dados={professorSelecionado}
          onClose={() => setModalAberto(false)}
          onSalvo={handleSalvo}
        />
      </ModalProf>

      <ModalDelete
        isOpen={modalDeleteOpen}
        onClose={() => setModalDeleteOpen(false)}
        icon={<Book size={28} />}
        title={`Deseja excluir o professor ${professorSelecionado?.nome}`}
        decision1={<ThumbsUp size={22}/>}
        decision2={<ThumbsDown size={22} />}
        onConfirm={handleDeletar}
      />

    </LayoutBase>
  )
}

export default Professores