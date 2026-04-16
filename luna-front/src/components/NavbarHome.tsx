import { Bell, ListFilter, Search } from "lucide-react"
import Button from "./button"

type NavBarHomeProps = {
    searchValue: string
    onSearchChange: (value: string) => void
    searchPlaceholder?: string
    buttonLabel: string
    onButtonClick: () => void
}

export default function NavbarHome({
    searchValue,
    onSearchChange,
    searchPlaceholder = "Filtrar",
    buttonLabel,
    onButtonClick,
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
                        Filtrar <ListFilter size={20} />
                        <span>{buttonLabel}</span>
                    </Button>
                </div>
        </div>
    )
}