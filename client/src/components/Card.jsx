import React from "react"
import style from "./styles/Card.module.scss"

function Card({ background_image, name, genres }) {
  return (
    <>
      <div className={style.card}>
        <h3>{name}</h3>
        <img src={background_image} alt="videoGame" />
        <h5>{genres.join(" / ")}</h5>
      </div>
    </>
  )
}

export default Card
