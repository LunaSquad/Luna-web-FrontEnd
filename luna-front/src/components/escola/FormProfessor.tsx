import React, { useState, useEffect } from "react";
import Button from "./button";
import Input from "./input";
import UploadImagem from "./buttonImage";

const token = localStorage.getItem("token")

interface FormProfessoresProps {
    dados?: any
    onClose?: () => void
    onSalvo?: () => void  // ← adiciona
}

export default function FormProfessores({ dados, onClose, onSalvo }: FormProfessoresProps) {

    const [nome, setNome] = useState(dados?.nome || "")
    const [sobrenome, setSobrenome] = useState(dados?.sobrenome || "")
    const [cpf, setCpf] = useState(dados?.cpf || "")
    const [data, setData] = useState(dados?.data || "")
    const [rg, setRg] = useState(dados?.rg || "")
    const [cidade, setCidade] = useState(dados?.cidade || "")
    const [telefone, setTelefone] = useState(dados?.telefone || "")
    const [email, setEmail] = useState(dados?.email || "")
    const [senha, setSenha] = useState("")
    const [imagem, setImagem] = useState<File | null>(null)
    const [carregando, setCarregando] = useState(false)
    const [erro, setErro] = useState<string | null>(null)

    useEffect(() => {
        if (dados) {
            setNome(dados.nome || "")
            setSobrenome(dados.sobrenome || "")
            setCpf(dados.cpf || "")
            setData(dados.data || "")
            setRg(dados.rg || "")
            setCidade(dados.cidade || "")
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
            form.append("data", data)
            form.append("rg", rg)
            form.append("cidade", cidade)
            form.append("telefone", telefone)
            form.append("email", email)
            if (senha) form.append("senha", senha)
            if (imagem) form.append("imagem", imagem)

            // se tem id é edição (PUT), senão é criação (POST)
            const url = dados?.id
                ? `https://sua-api.com/professores/${dados.id}`
                : "https://sua-api.com/professores"

            const method = dados?.id ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: { Authorization: `Bearer ${token}` },
                body: form,
            })

            if (!response.ok) {
                const err = await response.json().catch(() => null)
                throw new Error(err?.message ?? "Erro ao salvar professor")
            }

            onSalvo?.()  // avisa o pai que salvou com sucesso
        } catch (err) {
            setErro(err instanceof Error ? err.message : "Erro inesperado")
        } finally {
            setCarregando(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="formCadastroProf">
                    <div className="dadosCadGeralProf">
                        <div className="dadosCad3">
                            <Input id="nome" label="Nome" type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                            <Input id="cpf" label="CPF" type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                            <Input id="rg" label="RG" type="text" placeholder="RG" value={rg} onChange={(e) => setRg(e.target.value)} />
                            <Input id="telefone" label="Telefone" type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                            <Input id="senha" label="Senha" type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                        </div>
                        <div className="dadosCad4">
                            <Input id="sobrenome" label="Sobrenome" type="text" placeholder="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
                            <Input id="dtNasci" label="Data de Nascimento" type="date" placeholder="Data de Nascimento" value={data} onChange={(e) => setData(e.target.value)} />
                            <Input id="cidade" label="Cidade" type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                            <Input id="email" label="E-mail" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <UploadImagem
                                label="Imagem do Rosto do Docente"
                                onChange={(file) => setImagem(file)}
                            />
                        </div>
                    </div>

                    {erro && <p style={{ color: 'red', fontFamily: 'Inter', fontSize: 14 }}>{erro}</p>}

                    <div className="botao">
                        <Button type="submit" className="submitCadastrarProf" disabled={carregando}>
                            {carregando ? "Salvando..." : "Salvar"}
                        </Button>
                    </div>
                </form>
    )
}