import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import NavTitulo from "../components/escola/NavbarTitulo"
import Button from "../components/escola/button"
import Input from "../components/escola/input"
import UploadImagem from "../components/escola/buttonImage"
import { Check, Circle, IdCard, Eye, EyeClosed, Map, Mail, Building2, Smartphone, StretchVertical, UserPen} from "lucide-react"

function Cadastro(){
    const [nome,setNome] = useState("")
    const [cnpj,setCnpj] = useState("")
    const [email,setEmail] = useState("")
    const [bairro,setBairro] = useState("")
    const [telefone,setTelefone] = useState("")
    const [cidade,setCidade] = useState("")
    const [rua,setRua] = useState("")
    const [senha,setSenha] = useState("")
    const [imagem, setImagem] = useState<File | null>(null)
    const [verSenha, setVerSenha] = useState(false)
    const [erro, setErro] = useState<string | null>(null)
    const [carregando, setCarregando] = useState(false)

    const navigate = useNavigate()

    const toggleSenha = () => {
        setVerSenha(!verSenha);
    };

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault()
        setErro(null)
        setCarregando(true)

        try {
            const form = new FormData()
            form.append("nome", nome)
            form.append("cnpj", cnpj)
            form.append("email", email)
            form.append("bairro", bairro)
            form.append("telefone", telefone)
            form.append("cidade", cidade)
            form.append("rua", rua)
            form.append("senha", senha)
            if (imagem) form.append("imagem", imagem)

            const response = await fetch("https://sua-api.com/escolas/cadastro", {
                method: "POST",
                body: form,
            })

            if (!response.ok) {
                const err = await response.json().catch(() => null)
                throw new Error(err?.message ?? "Erro ao cadastrar")
            }

            navigate("/")
        } catch (err) {
            setErro(err instanceof Error ? err.message : "Erro inesperado")
        } finally {
            setCarregando(false)
        }
    }

    return(

        <div className="containerCadastro">
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

            <div className="Cadastro">
                <div className="form-header-text-cadastro">
                    <h2>Cadastro</h2>
                    <p>Preencha os dados da instituição</p>
                </div>
                <form onSubmit={handleSubmit} className="formCadastro">
                    <div className="dadosCadGeral">
                        <div className="dadosCad1">
                            <div className="input-container">
                                <Input id="nome" label="Nome" type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                                <UserPen size={18} />
                            </div>
                            <div className="input-container">
                                <Input id="cnpj" label="CNPJ" type="text" placeholder="CNPJ" value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
                                <IdCard size={18} />
                            </div>
                            <div className="input-container">
                                <Input id="email" label="E-mail" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <Mail size={18} />
                            </div>
                            <div className="input-container">
                                <Input id="telefone" label="Telefone" type="text" placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                                <Smartphone size={18} />
                            </div>
                        </div>

                        <div className="dadosCad2">
                            <div className="input-container">
                                <Input id="bairro" label="Bairro" type="text" placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                                <Map size={18} />
                            </div>
                            <div className="input-container">
                                <Input id="cidade" label="Cidade" type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                                <Building2 size={18} />
                            </div>
                            <div className="input-container">
                                <Input id="rua" label="Rua" type="text" placeholder="Rua" value={rua} onChange={(e) => setRua(e.target.value)} />
                                <StretchVertical size={18} />
                            </div>
                            <div className="input-container">
                                <Input 
                                    id="senha" 
                                    label="Senha" 
                                    type={verSenha ? "text" : "password"} 
                                    placeholder="Senha" 
                                    value={senha} 
                                    onChange={(e) => setSenha(e.target.value)} 
                                />
                                <div className="icon-container-password" onClick={toggleSenha}>
                                    {verSenha ? <Eye size={18} /> : <EyeClosed size={18} />}
                                </div>
                            </div>
                        </div>
                    </div>

                    <UploadImagem
                        label="Imagem da Escola"
                        onChange={(file) => setImagem(file)}
                    />

                    {erro && <p className="erro-form">{erro}</p>}

                    <div className="botao">
                        <Button
                            type="submit"
                            className="submitCadastrar"
                            disabled={carregando}
                        >
                            {carregando ? "Cadastrando..." : "Cadastrar"}
                        </Button>
                    </div>
                </form> 

                <p className="footer-text">
                    Já possui conta? <span><Link to="/">Entrar!</Link></span>
                </p>

            </div>

        </div>


    )
}

export default Cadastro