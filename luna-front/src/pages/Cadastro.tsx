import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import NavTitulo from "../components/NavbarTitulo"
import Button from "../components/button"
import Input from "../components/input"
import UploadImagem from "../components/buttonImage"

function Login(){
    const [nome,setNome] = useState("")
    const [cnpj,setCnpj] = useState("")
    const [email,setEmail] = useState("")
    const [bairro,setBairro] = useState("")
    const [telefone,setTelefone] = useState("")
    const [cidade,setCidade] = useState("")
    const [rua,setRua] = useState("")
    const [senha,setSenha] = useState("")

    const navigate = useNavigate()


    function handleSubmit(e){
        e.preventDefault()

        console.log("Informações Enviadas!")

        navigate("/")
    }


    function Entrar(){
        navigate("/")
    }

    function irParaCadastro(){
        navigate("/cadastro")
    }

    return(

        <div className="container">
            <NavTitulo />

            <div className="circles">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
            </div>

            <div className="Cadastro">
                <div className="opc">
                    <Button onClick={Entrar}>Entrar</Button>
                    <Button onClick={irParaCadastro}>Criar Conta</Button>
                </div>

                <form onSubmit={handleSubmit} className="formCadastro">
                    <div className="dadosCadGeral">
                        <div className="dadosCad1">
                            <Input
                                id="nome"
                                label="Nome"
                                type="text"
                                placeholder="Nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <Input
                                id="cnpj"
                                label="CNPJ"
                                type="text"
                                placeholder="CNPJ"
                                value={cnpj}
                                onChange={(e) => setCnpj(e.target.value)}
                            />
                            <Input
                                id="email"
                                label="E-mail"
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                id="bairro"
                                label="Bairro"
                                type="text"
                                placeholder="Bairro"
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value)}
                            />
                         </div>
                        <div className="dadosCad2">
                                <Input
                                    id="telefone"
                                    label="Telefone"
                                    type="text"
                                    placeholder="Telefone"
                                    value={telefone}
                                    onChange={(e) => setTelefone(e.target.value)}
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
                                    id="rua"
                                    label="Rua"
                                    type="text"
                                    placeholder="Rua"
                                    value={rua}
                                    onChange={(e) => setRua(e.target.value)}
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
                    </div>

                    <UploadImagem

                        label="Imagem da Escola"
                        onChange={(file) =>{
                            alert("Imagem anexada com sucesso") 
                            console.log(file)
                        }

                        }
                    />

                    <div className="botao">
                        <Button
                            type="submit"
                            className="submitCadastrar"
                        >
                            Cadastrar
                        </Button>
                    </div>
                </form>
            </div>

        </div>


    )
}

export default Login