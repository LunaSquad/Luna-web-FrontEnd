import React, { useState, useEffect } from "react";
import Button from "./button";
import Input from "./input";
import UploadImagem from "./buttonImage";

const token = localStorage.getItem("token")

interface FormAlunosProps {
    dados?: any
    onClose?: () => void
    onSalvo?: () => void
}

export default function FormAlunos({ dados, onClose, onSalvo }: FormAlunosProps) {

    const [nome, setNome] = useState(dados?.nome || "")
    const [sobrenome, setSobrenome] = useState(dados?.sobrenome || "")
    const [cpf, setCpf] = useState(dados?.cpf || "")
    const [nomeResponsavel, setNomeResponsavel] = useState(dados?.nomeResponsavel || "")
    const [ra, setRa] = useState(dados?.ra || "")
    const [data, setData] = useState(dados?.data || "")
    const [telefone, setTelefone] = useState(dados?.telefone || "")
    const [email, setEmail] = useState(dados?.email || "")
    const [imagem, setImagem] = useState<File | null>(null)
    const [laudo, setLaudo] = useState<File | null>(null)
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState<string | null>(null)

    useEffect(() => {
        if (dados) {
            setNome(dados.nome || "")
            setSobrenome(dados.sobrenome || "")
            setCpf(dados.cpf || "")
            setNomeResponsavel(dados.nomeResponsavel || "")
            setRa(dados.ra || "")
            setData(dados.data || "")
            setTelefone(dados.telefone || "")
            setEmail(dados.email || "")
        }
    }, [dados])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setErro(null)
        setCarregando(true)

        try {
            const form = new FormData()
            form.append("nome", nome)
            form.append("sobrenome", sobrenome)
            form.append("cpf", cpf)
            form.append("nomeResponsavel", nomeResponsavel)
            form.append("ra", ra)
            form.append("data", data)
            form.append("telefone", telefone)
            form.append("email", email)
            if (imagem) form.append("imagem", imagem)
            if (laudo) form.append("laudo", laudo)

            const url = dados?.id
                ? `https://sua-api.com/alunos/${dados.id}`
                : "https://sua-api.com/alunos"

            const method = dados?.id ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: { Authorization: `Bearer ${token}` },
                body: form,
            })

            if (!response.ok) {
                const err = await response.json().catch(() => null)
                throw new Error(err?.message ?? "Erro ao salvar aluno")
            }

            onSalvo?.()
        } catch (err) {
            setErro(err instanceof Error ? err.message : "Erro inesperado")
        } finally {
            setCarregando(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="formCadastroAluno">
            <div className="dadosCadGeralAluno">
                <div className="dadosCad5">
                    <Input id="nome" label="Nome" type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                    <Input id="cpf" label="CPF" type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                    <Input id="ra" label="RA" type="text" placeholder="RA" value={ra} onChange={(e) => setRa(e.target.value)} />
                    <Input id="telefone" label="Telefone" type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                    <UploadImagem
                        label="Imagem do Rosto do Aluno"
                        onChange={(file) => setImagem(file)}
                    />
                </div>
                <div className="dadosCad6">
                    <Input id="sobrenome" label="Sobrenome" type="text" placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
                    <Input id="nomeResponsavel" label="Nome do Responsável" type="text" placeholder="Nome do Responsável" value={nomeResponsavel} onChange={(e) => setNomeResponsavel(e.target.value)} />
                    <Input id="dtNascimento" label="Data de Nascimento" type="date" placeholder="Data de Nascimento" value={data} onChange={(e) => setData(e.target.value)} />
                    <Input id="email" label="E-mail" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <UploadImagem
                        label="Laudo de TDAH do Aluno"
                        onChange={(file) => setLaudo(file)}
                    />
                </div>
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