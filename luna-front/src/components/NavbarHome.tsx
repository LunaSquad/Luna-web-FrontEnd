import { Settings2, Search } from "lucide-react"
import Button from "./button"
import UserInfo from "./UserInfo"

type NavBarHomeProps = {
    searchValue: string
    onSearchChange: (value: string) => void
    searchPlaceholder?: string
    buttonLabel: string
    onButtonClick: () => void

    // dados do usuario passados aqui também

    nome: string
    foto: string
    notificacoes: number
}


export default function NavbarHome({
    searchValue,
    onSearchChange,
    searchPlaceholder = "Filtrar",
    buttonLabel,
    onButtonClick,
    nome,
    foto,
    notificacoes
}: NavBarHomeProps){
    
    return(
        <div className="NavBarCompleta">
                <div className="searchAction">
                    <div className="buscaBox">
                        <Search size={18} className="buscaIcon" />
                        <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={searchPlaceholder}
                        className="buscaInput"
                        />
                    </div>

                    <Button
                        type="button"
                        onClick={onButtonClick}
                        className="buttonFilter"
                    >
                        <Settings2 size={20} className="buscaFilter" />
                        <span>{buttonLabel}</span>
                    </Button>
                </div>

                <UserInfo 
                    nome={nome}
                    foto={foto}
                    notificacoes={notificacoes}
                />
                
        </div>
    )
}