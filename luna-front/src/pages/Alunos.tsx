import { useState } from "react"
import { Pencil, Trash2, GraduationCap } from "lucide-react"
import InfoHeader from "../components/InfoHeader"
import LayoutBase from "../components/layout/LayoutBase"
import SearchActionBar from "../components/SearchActionBar"
import Table from "../components/TableInformations"

type Aluno = {
  id: number;
  nome: string;
  ra: number;
  turma: string;
  responsavel: string;
  foto: string;
};

const alunos: Aluno[] = [
  {
    id: 1,
    nome: "Maria Clara",
    ra: 234585960,
    turma: "3°A",
    responsavel:"Carla Silva",
    foto: "/images/maria.png",
  },
  {
    id: 2,
    nome: "João Oliveira",
    ra: 109847282,
    turma: "1°A",
    responsavel:"Adriana Oliveira",
    foto: "/images/joao.png",
  },
  {
    id: 3,
    nome: "Carol Silva",
    ra: 387437485,
    turma: "1°A",
    responsavel:"Fernanda Silva",
    foto: "/images/fernanda.png",
  },
];


function Alunos() {
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

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
      header: "RA",
      accessor: "ra",
      render: (row: Aluno) => (
        <span className="cellRa">{row.ra}</span>
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
      accessor: "responsavel",
      render: (row: Aluno) => (
        <span className="cellResponsavel">{row.responsavel}</span>
      ),
    },
    {
      header: "Ações",
      accessor: "acoes",
      render: (row: Aluno) => (
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
        icon={<GraduationCap size={26}/>}
        title="Alunos"
        subtitle="Gerenciar matrículas e dados dos alunos"
      />

      <SearchActionBar
        searchValue={busca}
        onSearchChange={setBusca}
        searchPlaceholder="Buscar Aluno"
        buttonLabel="Novo Aluno"
        onButtonClick={() => setModalAberto(true)}
      />

      <Table columns={columns} data={alunos} />

    </LayoutBase>
  )
}

export default Alunos