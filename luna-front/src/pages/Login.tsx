import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import NavTitulo from "../components/escola/NavbarTitulo"
import Button from "../components/escola/button"
import Input from "../components/escola/input"
import { Check, Circle, Mail, Eye, EyeClosed } from "lucide-react"

function Login(){
    const [email,setEmail] = useState("")
    const [senha,setSenha] = useState("")
    const [verSenha, setVerSenha] = useState(false)

    const navigate = useNavigate()

    const toggleSenha = () => {
        setVerSenha(!verSenha);
    };

    function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        navigate("/home")
    }


    return(

        <div className="containerLogin">
            <NavTitulo />

            <div className="principal-info-right">
                <div className="principal-platform-title">
                    <Circle size={16} fill="#D9D9D9"/>
                    <p>
                        PLATAFORMA ESCOLAR
                    </p>
                </div>

                <h1 className="principal-info-right-title">
                    Educação que <span>acolhe</span> cada aluno.
                </h1>

                <p className="principal-info-right-description">
                    Uma experiência pensada para escolas que valorizam o cuidado individual, a organização inteligente e o desenvolvimento neurodiverso.
                </p>

                <div className="principal-info-right-opcs">
                    <div className="principal-info-right-opc">
                        <p className="opc-icon">
                            <Check size={16} />
                        </p>
                        <p className="opc-description">
                            Acompanhamento focado em neurodiversidade
                        </p>
                    </div>
                    <div className="principal-info-right-opc">
                        <p className="opc-icon">
                            <Check size={16} />
                        </p>
                        <p className="opc-description">
                            Ferramentas de suporte à acessibilidade
                        </p>
                    </div>
                    <div className="principal-info-right-opc">
                        <p className="opc-icon">
                            <Check size={16} />
                        </p>
                        <p className="opc-description">
                            Gestão humanizada de alunos e turmas
                        </p>
                    </div>
                </div>
            </div>

            <div className="logins">
                <div className="form-header-text-login">
                    <h2>Entrar</h2>
                    <p>Acesse sua conta</p>
                </div>
                <form onSubmit={handleSubmit} className="formLogin">
                    <div className="conjEmail">
                        <Input
                            id="email"
                            label="E-mail"
                            type="email"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Mail size={18} className="icon-input"/>
                    </div>
                    <div className="conjSenha">
                        <Input
                            id="senha"
                            label="Senha"
                            type={verSenha ? "text" : "password"}
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <div className="icon-input" onClick={toggleSenha}>
                            {verSenha ? <EyeClosed size={18} /> : <Eye size={18} />}
                        </div>
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

                <p className="footer-text">
                    Novo por aqui? <span><Link to="/cadastro">Cadastre-se</Link></span>
                </p>
            </div>

        </div>


    )
}

export default Login