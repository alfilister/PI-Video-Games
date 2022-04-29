import style from "../styles/Paginado.module.scss"
import React, { Component } from "react"

export default class Paginado extends Component {
  render() {
    const {
      videogamesPerPage,
      allVideogames,
      paginado,
      nxtPage,
      prvPage,
      currentPage,
    } = this.props
    const pageNumbers = []

    const maxPages = Math.ceil(allVideogames / videogamesPerPage)

    for (let i = 1; i <= maxPages; i++) {
      pageNumbers.push(i)
    }

    return (
      <nav className={style.pagNav}>
        {currentPage > 1 && (
          <button className={style.btnNxtPrv} onClick={() => prvPage()}>
            Prev
          </button>
        )}

        {pageNumbers &&
          pageNumbers.map((number) => (
            <button
              className={style.pagBtn}
              key={number}
              onClick={() => paginado(number)}
            >
              {number}
            </button>
          ))}

        {currentPage < maxPages && (
          <button className={style.btnNxtPrv} onClick={() => nxtPage(maxPages)}>
            Next
          </button>
        )}
      </nav>
    )
  }
}
