import { useState } from "react"
import { Pencil, Trash2, Book } from "lucide-react"
import InfoHeader from "../components/InfoHeader"
import LayoutBase from "../components/layout/LayoutBase"
import SearchActionBar from "../components/SearchActionBar"
import Table from "../components/TableInformations"
import ModalProf from "./modals/ModalProf"
import FormProfessores from "../components/FormProfessor"

type Professor = {
  id: number;
  nome: string;
  email: string;
  foto: string;
};

const professores: Professor[] = [
  {
    id: 1,
    nome: "Fernanda Souza",
    email: "fernanda@gmail.com",
    foto: "/images/fernanda.png",
  },
  {
    id: 2,
    nome: "Ronaldo Ferreira",
    email: "ronaldo@gmail.com",
    foto: "/images/ronaldo.png",
  },
  {
    id: 3,
    nome: "Cecilia da Silva",
    email: "cecilia@gmail.com",
    foto: "/images/cecilia.png",
  },
];


function Professores() {
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

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
          console.log("clicou") 
          setModalAberto(true)}}
      />

      <Table columns={columns} data={professores} />

      <ModalProf
        isOpen={modalAberto} 
        onClose={() => setModalAberto(false)}
      >
        <div className="logoProf">
          <Book  size={24}/>
        </div>
        <FormProfessores />
      </ModalProf>

    </LayoutBase>

  )
}

export default Professores