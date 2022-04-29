import style from "../styles/Paginado.module.scss"
import React, { Component } from "react"

export default class Paginado extends Component {
  render() {
    const { videogamesPerPage, allVideogames, paginado } = this.props
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
      pageNumbers.push(i)
    }
    return (
      <nav className={style.pagNav}>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <button key={number} onClick={() => paginado(number)}>
              {number}
            </button>
          ))}
      </nav>
    )
  }
}
