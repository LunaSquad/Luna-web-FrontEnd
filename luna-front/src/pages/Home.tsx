import { useState } from "react"
import {House} from "lucide-react"
import InfoHeader from "../components/InfoHeader"
import LayoutBase from "../components/layout/LayoutBase"
import NavbarHome from "../components/NavbarHome"


function Home() {
  return (
    <LayoutBase>

      <NavbarHome></NavbarHome>

    </LayoutBase>
  )
}

export default Home