import React, { useState } from "react";
import Button from "./button";
import Input from "./input";
import UploadImagem from "./buttonImage";

interface FormTurmasProps{
    dados ?: any
    onClose?: () => void
}





export default function FormTurma({dados, onClose}: FormTurmasProps){

    const [nomeTurma, setNomeTurma] = useState(dados?.nomeTurma || "")
    const [professor, setProfessor] = useState(dados?.professor || "")
    const [buscaAluno, setBuscaAluno] = useState(dados?.buscaAluno || "")
    const [alunosSelecionados, setAlunosSelecionados] = useState<number[]>([])

    const alunos = [
    { id: 1, nome: "Maria Clara", telefone: "234585960", foto: "/images/maria.png" },
    { id: 2, nome: "João Pedro", telefone: "123456789", foto: "/images/joao.png" },
  ]

    function toggleAluno(id: number) {
        setAlunosSelecionados((prev) =>
        prev.includes(id)
            ? prev.filter((a) => a !== id)
            : [...prev, id]
        )
    }


    function handleSubmit(e: React.FormEvent){
        e.preventDefault()

        if (onClose) onClose()
    }

    return(
        <form onSubmit={handleSubmit} className="formCadastroTurma">
                    <div className="dadosCadGeralTurma">
                        <div className="dadosCad7">
                            <Input
                                id="turma"
                                label="Turma"
                                type="text"
                                placeholder="Turma"
                                value={nomeTurma}
                                onChange={(e) => setNomeTurma(e.target.value)}
                            />
                            
                         </div>
                        <div className="inputGroup">
                                <label className="nomeProfessor">
                                    Professor
                                </label>
                                <select value={professor}
                                onChange={(e) => setProfessor(e.target.value)}>
                                    <option value="">Professor Responsável</option>
                                    <option value="1">Professor 1</option>
                                    <option value="2">Professor 2</option>
                                </select>
                        </div>
                    </div>

                    <div className="searchAluno">
                        <input
                            placeholder="Digite o nome do aluno..."
                            value={buscaAluno}
                            onChange={(e) => setBuscaAluno(e.target.value)}
                        />
                    </div>

                    <div className="listaAlunos">
                        {alunos.map((aluno) => (
                            <div key={aluno.id} className="alunoItem">

                                <div className="alunoInfo">
                                <img src={aluno.foto} alt={aluno.nome} />
                                <span>{aluno.nome}</span>
                                <span>{aluno.telefone}</span>
                                </div>

                                <input
                                type="checkbox"
                                checked={alunosSelecionados.includes(aluno.id)}
                                onChange={() => toggleAluno(aluno.id)}
                                />

                            </div>
                        ))}
                    </div>

                    <div className="botao">
                        <Button
                            type="submit"
                            className="submitCadastrarAluno"
                        >
                            Salvar
                        </Button>
                    </div>
                </form>
    )

}