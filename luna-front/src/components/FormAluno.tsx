import React, { useState } from "react";
import Button from "./button";
import Input from "./input";
import UploadImagem from "./buttonImage";

interface FormAlunosProps{
    dados ?: any
    onClose?: () => void
}





export default function FormAlunos({dados, onClose}: FormAlunosProps){

    const [nome, setNome] = useState(dados?.nome || "")
    const [sobrenome, setSobrenome] = useState(dados?.sobrenome || "")
    const [cpf, setCpf] = useState(dados?.cpf || "")
    const [nomeResponsavel, setNomeResponsavel] = useState(dados?.data || "")
    const [ra, setRa] = useState(dados?.rg || "")
    const [data, setData] = useState(dados?.cidade || "")
    const [telefone, setTelefone] = useState(dados?.telefone || "")
    const [email, setEmail] = useState(dados?.email || "")

    function handleSubmit(e: React.FormEvent){
        e.preventDefault()

        if (onClose) onClose()
    }

    return(
        <form onSubmit={handleSubmit} className="formCadastroAluno">
                    <div className="dadosCadGeralAluno">
                        <div className="dadosCad5">
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
                                id="ra"
                                label="RA"
                                type="text"
                                placeholder="RA"
                                value={ra}
                                onChange={(e) => setRa(e.target.value)}
                            />
                            <Input
                                id="telefone"
                                label="Telefone"
                                type="text"
                                placeholder="Telefone"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                            />
                            <UploadImagem

                                    label="Imagem do Rosto do Aluno"
                                    onChange={(file) =>{
                                        alert("Imagem anexada com sucesso") 
                                        console.log(file)
                                    }

                                    }
                                />
                            
                         </div>
                        <div className="dadosCad6">
                                <Input
                                    id="sobrenome"
                                    label="Sobrenome"
                                    type="text"
                                    placeholder="Sobrenome"
                                    value={sobrenome}
                                    onChange={(e) => setSobrenome(e.target.value)}
                                />
                                <Input
                                    id="nomeResponsavel"
                                    label="Nome do Responsável"
                                    type="text"
                                    placeholder="Nome do Responsável"
                                    value={nomeResponsavel}
                                    onChange={(e) => setNomeResponsavel(e.target.value)}
                                />
                                <Input
                                    id="dtNascimento"
                                    label="Data de Nascimento"
                                    type="date"
                                    placeholder="Data de Nascimento"
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
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

                                    label="Laudo de TDAH do Aluno"
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
                            className="submitCadastrarAluno"
                        >
                            Salvar
                        </Button>
                    </div>
                </form>
    )

}