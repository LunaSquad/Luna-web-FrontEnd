import { useState, useEffect } from "react"
import { Pencil, Trash2, GraduationCap, ThumbsUp, ThumbsDown } from "lucide-react"
import InfoHeader from "../../components/escola/InfoHeader"
import LayoutBase from "../../components/escola/layout/LayoutBase"
import SearchActionBar from "../../components/escola/SearchActionBar"
import Table from "../../components/escola/TableInformations"
import ModalAluno from "../modals/ModalAluno"
import FormAlunos from "../../components/escola/FormAluno"
import ModalDelete from "../modals/ModalDelete"

type Aluno = {
  id: number;
  nome: string;
  email: string;
  foto: string;
  turma: string;
  nomeResponsavel: string;
};

const token = localStorage.getItem("token")

async function fetchAlunos(): Promise<Aluno[]> {
  const response = await fetch("https://sua-api.com/alunos", {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error("Erro ao carregar alunos")
  return response.json()
}

async function deletarAluno(id: number) {
  const response = await fetch(`https://sua-api.com/alunos/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error("Erro ao deletar aluno")
}

function Alunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [busca, setBusca] = useState("")
  const [modalAberto, setModalAberto] = useState(false)
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)
  const [alunoSelecionado, setAlunoSelecionado] = useState<Aluno | null>(null)

  useEffect(() => {
    fetchAlunos()
      .then(setAlunos)
      .catch((err) => console.error(err.message))
  }, [])

  const alunosFiltrados = alunos.filter((a) =>
    a.nome.toLowerCase().includes(busca.toLowerCase()) ||
    a.email.toLowerCase().includes(busca.toLowerCase()) ||
    a.turma.toLowerCase().includes(busca.toLowerCase())
  )

  async function handleDeletar() {
    if (!alunoSelecionado) return

    setAlunos((prev) => prev.filter((a) => a.id !== alunoSelecionado.id))
    setModalDeleteOpen(false)

    try {
      await deletarAluno(alunoSelecionado.id)
    } catch (err) {
      console.error(err)
      fetchAlunos().then(setAlunos)
    }
  }

  function handleSalvo() {
    setModalAberto(false)
    fetchAlunos().then(setAlunos)
  }

  const columns = [
    {
      header: "Nome",
      accessor: "nome",
      render: (row: Aluno) => (
        <div className="cellNome">
          <img src={row.foto} alt={row.nome} className="fotoPessoa" />
          <span>{row.nome}</span>
        </div>
      ),
    },
    {
      header: "E-mail",
      accessor: "email",
      render: (row: Aluno) => (
        <span className="emailBadge">{row.email}</span>
      ),
    },
    {
      header: "Turma",
      accessor: "turma",
      render: (row: Aluno) => (
        <span className="turmaBadge">{row.turma}</span>
      ),
    },
    {
      header: "Responsável",
      accessor: "nomeResponsavel",
      render: (row: Aluno) => (
        <span className="cellResponsavel">{row.nomeResponsavel}</span>
      ),
    },
    {
      header: "Ações",
      accessor: "acoes",
      render: (row: Aluno) => (
        <div className="acoesCell">
          <button
            type="button"
            onClick={() => {
              setAlunoSelecionado(row)
              setModalDeleteOpen(true)
            }}>
            <Trash2 size={20} />
          </button>

          <button
            type="button"
            onClick={() => {
              setAlunoSelecionado(row)
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
        icon={<GraduationCap size={26}/>}
        title="Alunos"
        subtitle="Gerenciar dados de alunos"
      />

      <SearchActionBar
        searchValue={busca}
        onSearchChange={setBusca}
        searchPlaceholder="Buscar Aluno"
        buttonLabel="Novo Aluno"
        onButtonClick={() => {
          setAlunoSelecionado(null)
          setModalAberto(true)
        }}
      />

      <Table columns={columns} data={alunosFiltrados} />

      <ModalAluno
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      >
        <div className="logoAluno">
          <GraduationCap size={24}/>
        </div>
        <FormAlunos
          dados={alunoSelecionado}
          onClose={() => setModalAberto(false)}
          onSalvo={handleSalvo}
        />
      </ModalAluno>

      <ModalDelete
        isOpen={modalDeleteOpen}
        onClose={() => setModalDeleteOpen(false)}
        icon={<GraduationCap size={28} />}
        title={`Deseja excluir o aluno ${alunoSelecionado?.nome}`}
        decision1={<ThumbsUp size={22}/>}
        decision2={<ThumbsDown size={22} />}
        onConfirm={handleDeletar}
      />

    </LayoutBase>
  )
}

export default Alunos