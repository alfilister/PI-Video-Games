import style from "./styles/Paginado.module.scss"
import React from "react"

export default function Paginado({
  videogamesPerPage,
  allVideogames,
  paginado,
}) {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <nav className={style.pagNav}>
      {pageNumbers &&
        pageNumbers.map((number) => (
          <button onClick={() => paginado(number)}>{number}</button>
        ))}
    </nav>
  )
}
