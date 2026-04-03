import React from "react";

interface InfoHeaderProps{
    icon: React.ReactNode
    title: string
    subtitle: string
}

export default function InfoHeader(
    {icon, title, subtitle} : InfoHeaderProps){
        return(
            <div className="infoHeader">
                <div className="infoHeaderIcon">
                    {icon}
                </div>

                <div className="infoHeaderText">
                    <h2 className="infoHeaderTitle">
                        {title}
                    </h2>

                    <p className="infoHeaderSubtitle">
                        {subtitle}
                    </p>
                </div>
            </div>
        )
    }