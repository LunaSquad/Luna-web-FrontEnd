import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import NavTitulo from "../components/NavbarTitulo"
import Button from "../components/button"
import Input from "../components/input"

function Login(){
    const [email,setEmail] = useState("")
    const [senha,setSenha] = useState("")

    const navigate = useNavigate()


    function handleSubmit(e){
        e.preventDefault()

        console.log("Informações Enviadas!")

        navigate("/home")
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

            <div className="logins">
                <div className="opc">
                    <Button onClick={Entrar}>Entrar</Button>
                    <Button onClick={irParaCadastro}>Criar Conta</Button>
                </div>

                <form onSubmit={handleSubmit} className="formLogin">
                    <div className="conjEmail">
                        {/* <label htmlFor="email">E-mail</label> */}
                        {/* <input
                            id="email"
                            placeholder="E-mail"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                    
                        /> */}
                        <Input
                            id="email"
                            label="E-mail"
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="conjSenha">
                        {/* <label htmlFor="">Senha</label>
                        <input 
                            id="senha"
                            placeholder="Senha"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        /> */}
                        <Input
                            id="senha"
                            label="Senha"
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>

                    <div className="botao">
                        <Button
                            type="submit"
                            className="submitLogin"
                        >
                            Acessar
                        </Button>
                    </div>
                </form>
            </div>

        </div>


    )
}

export default Login