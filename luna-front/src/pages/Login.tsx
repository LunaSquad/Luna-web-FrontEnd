import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import NavTitulo from "../components/navbarTitulo"

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

            <form className="formLogin" action="">

            </form>

        </div>


    )
}

export default Login