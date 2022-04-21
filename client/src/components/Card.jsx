import React from "react"
import style from "../styles/Card.module.scss"

function Card({ background_image, name, genres, rating }) {
  return (
    <div className={style.card}>
      <h4>{rating}</h4>
      <h3>{name}</h3>
      <img src={background_image} alt="videoGame" />
      <h5>{genres.join(" / ")}</h5>
    </div>
  )
}

export default Card
