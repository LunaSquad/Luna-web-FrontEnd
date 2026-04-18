import { Bell } from "lucide-react";

interface UserInfoProps{
    nome: string
    foto: string
    notificacoes: number
}

export default function UserInfo({
    nome,
    foto,
    notificacoes
}: UserInfoProps){
    return(
        <div className="userInfo">
                    <div className="bellWrapper">
                        <Bell size={26} className="bellInfo"/>

                        {notificacoes > 0 && (
                            <div className="badge">
                                {notificacoes > 99 ? "+99" : notificacoes}
                            </div>
                        )}
                    </div>

                    <p className="textUser">Olá, {nome}!</p>

                    <img src={foto} alt="avatar" className="avatarUser" />
                    
        </div>
    )
}