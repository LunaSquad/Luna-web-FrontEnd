import { useState } from "react"
import {House} from "lucide-react"
import InfoHeader from "../components/InfoHeader"
import LayoutBase from "../components/layout/LayoutBase"

function Home() {
  return (
    <LayoutBase>

      <InfoHeader
        icon={<House size={26}/>}
        title="Home"
        subtitle="Vai ter algo aqui"
      />

    </LayoutBase>
  )
}

export default Home