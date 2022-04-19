import React from "react"
import { Link } from "react-router-dom"
import style from "./styles/Card.module.scss"

function Card({ background_image, name, genres, id }) {
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
