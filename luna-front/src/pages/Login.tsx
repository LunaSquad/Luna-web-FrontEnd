import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import NavTitulo from "../components/NavbarTitulo"

function Login(){
    const [email,setEmail] = useState("")
    const [senha,setSenha] = useState("")

    const navigate = useNavigate()


    function handleSubmit(e){
        e.preventDefault()

        console.log("Informações Enviadas!")

        navigate("/home")
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
                    <button>Entrar</button>
                    <button>Criar Conta</button>
                </div>

                <form onSubmit={handleSubmit} className="formLogin">
                    <div className="conjEmail">
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            placeholder="E-mail"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                    
                        />
                    </div>
                    <div className="conjSenha">
                        <label htmlFor="">Senha</label>
                        <input 
                            id="senha"
                            placeholder="Senha"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>

                    <div className="botao">
                        <button className="submitLogin" onClick={handleSubmit}>Acessar</button>
                    </div>
                </form>
            </div>

        </div>


    )
}

export default Login