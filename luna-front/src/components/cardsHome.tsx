import { Link } from "react-router-dom";
import { Book, GraduationCap, Users} from "lucide-react";

interface CardHomeProps{
    icon: React.ReactNode
    title: string
    count: number
}

export default function CardHome({
    icon,
    title,
    count   
}: CardHomeProps){
    return(
        <div className="cardHome">
            <p className="titleCardHome">
                {title}
            </p>

            <div className="cardInformation">
                <p className="qtdCard">{count}</p>
                <div className="iconCard">
                    {icon}
                </div>
            </div>

        </div>
    )
}