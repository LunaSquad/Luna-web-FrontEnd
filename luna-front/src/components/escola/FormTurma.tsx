import React, { useState, useEffect } from "react";
import Button from "./button";
import Input from "./input";

const token = localStorage.getItem("token")

interface Aluno {
    id: number
    nome: string
    telefone: string
    foto: string
}

interface Professor {
    id: number
    nome: string
}

interface FormTurmasProps {
    dados?: any
    onClose?: () => void
    onSalvo?: () => void
}

export default function FormTurma({ dados, onClose, onSalvo }: FormTurmasProps) {

    const [nomeTurma, setNomeTurma] = useState(dados?.nomeTurma || "")
    const [professor, setProfessor] = useState(dados?.professor || "")
    const [buscaAluno, setBuscaAluno] = useState("")
    const [alunosSelecionados, setAlunosSelecionados] = useState<number[]>(dados?.alunos ?? [])
    const [alunos, setAlunos] = useState<Aluno[]>([])
    const [professores, setProfessores] = useState<Professor[]>([])
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState<string | null>(null)

    useEffect(() => {
        async function fetchAlunos() {
            try {
                const response = await fetch("https://sua-api.com/alunos", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                if (!response.ok) throw new Error()
                const dados = await response.json()
                setAlunos(dados)
            } catch {
                console.error("Erro ao carregar alunos")
            }
        }

        async function fetchProfessores() {
            try {
                const response = await fetch("https://sua-api.com/professores", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                if (!response.ok) throw new Error()
                const dados = await response.json()
                setProfessores(dados)
            } catch {
                console.error("Erro ao carregar professores")
            }
        }

        fetchAlunos()
        fetchProfessores()
    }, [])

    useEffect(() => {
        if (dados) {
            setNomeTurma(dados.nomeTurma || "")
            setProfessor(dados.professor || "")
            setAlunosSelecionados(dados.alunos ?? [])
        }
    }, [dados])

    function toggleAluno(id: number) {
        setAlunosSelecionados((prev) =>
            prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
        )
    }

    const alunosFiltrados = alunos.filter((a) =>
        a.nome.toLowerCase().includes(buscaAluno.toLowerCase())
    )

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setErro(null)
        setCarregando(true)

        try {
            const payload = {
                nomeTurma,
                professorId: professor,
                alunosIds: alunosSelecionados,
            }

            const url = dados?.id
                ? `https://sua-api.com/turmas/${dados.id}`
                : "https://sua-api.com/turmas"

            const method = dados?.id ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            })

            if (!response.ok) {
                const err = await response.json().catch(() => null)
                throw new Error(err?.message ?? "Erro ao salvar turma")
            }

            onSalvo?.()
        } catch (err) {
            setErro(err instanceof Error ? err.message : "Erro inesperado")
        } finally {
            setCarregando(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="formCadastroTurma">
            <div className="dadosCadGeralTurma">
                <div className="dadosCad7">
                    <Input id="turma" label="Turma" type="text" placeholder="Turma" value={nomeTurma} onChange={(e) => setNomeTurma(e.target.value)} />
                </div>
                <div className="inputGroup">
                    <label className="nomeProfessor">Professor</label>
                    <select value={professor} onChange={(e) => setProfessor(e.target.value)}>
                        <option value="">Professor Responsável</option>
                        {professores.map((p) => (
                            <option key={p.id} value={p.id}>{p.nome}</option>
                        ))}
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
                {alunosFiltrados.map((aluno) => (
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

            {erro && <p style={{ color: 'red', fontFamily: 'Inter', fontSize: 14 }}>{erro}</p>}

            <div className="botao">
                <Button type="submit" className="submitCadastrarAluno" disabled={carregando}>
                    {carregando ? "Salvando..." : "Salvar"}
                </Button>
            </div>
        </form>
    )
}