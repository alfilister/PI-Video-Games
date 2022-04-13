import React from "react"
import { Link } from "react-router-dom"
import style from "./styles/LandingPage.module.scss"

function LandingPage() {
  return (
    <>
      <div className={style.landing}>
        <h1>Video</h1>
        <h1>Games</h1>
        <Link to="/home">
          <button>Enter</button>
        </Link>
      </div>
    </>
  )
}

export default LandingPage
