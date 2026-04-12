import React, { useState } from "react";
import Button from "./button";
import Input from "./input";
import UploadImagem from "./buttonImage";

interface FormProfessoresProps{
    dados ?: any
    onClose?: () => void
}





export default function FormProfessores({dados, onClose}: FormProfessoresProps){

    const [nome, setNome] = useState(dados?.nome || "")
    const [sobrenome, setSobrenome] = useState(dados?.sobrenome || "")
    const [cpf, setCpf] = useState(dados?.cpf || "")
    const [data, setData] = useState(dados?.data || "")
    const [rg, setRg] = useState(dados?.rg || "")
    const [cidade, setCidade] = useState(dados?.cidade || "")
    const [telefone, setTelefone] = useState(dados?.telefone || "")
    const [email, setEmail] = useState(dados?.email || "")
    const [senha, setSenha] = useState("")

    function handleSubmit(e: React.FormEvent){
        e.preventDefault()

        if (onClose) onClose()
    }

    return(
        <form onSubmit={handleSubmit} className="formCadastroProf">
                    <div className="dadosCadGeralProf">
                        <div className="dadosCad3">
                            <Input
                                id="nome"
                                label="Nome"
                                type="text"
                                placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <Input
                                id="cpf"
                                label="CPF"
                                type="text"
                                placeholder="CPF"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                            />
                            <Input
                                id="rg"
                                label="RG"
                                type="text"
                                placeholder="RG"
                                value={rg}
                                onChange={(e) => setRg(e.target.value)}
                            />
                            <Input
                                id="telefone"
                                label="Telefone"
                                type="text"
                                placeholder="Telefone"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                            />
                            <Input
                                id="senha"
                                label="Senha"
                                type="password"
                                placeholder="Senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                         </div>
                        <div className="dadosCad4">
                                <Input
                                    id="sobrenome"
                                    label="Sobrenome"
                                    type="text"
                                    placeholder="Sobrenome"
                                    value={sobrenome}
                                    onChange={(e) => setSobrenome(e.target.value)}
                                />
                                <Input
                                    id="dtNasci"
                                    label="Data de Nascimento"
                                    type="date"
                                    placeholder="Data de Nascimento"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                />
                                <Input
                                    id="cidade"
                                    label="Cidade"
                                    type="text"
                                    placeholder="Cidade"
                                    value={cidade}
                                    onChange={(e) => setCidade(e.target.value)}
                                />
                                <Input
                                    id="email"
                                    label="E-mail"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <UploadImagem

                                    label="Imagem do Rosto do Docente"
                                    onChange={(file) =>{
                                        alert("Imagem anexada com sucesso") 
                                        console.log(file)
                                    }

                                    }
                                />
                        </div>
                    </div>

                    <div className="botao">
                        <Button
                            type="submit"
                            className="submitCadastrarProf"
                        >
                            Salvar
                        </Button>
                    </div>
                </form>
    )

}