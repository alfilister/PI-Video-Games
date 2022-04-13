import style from "./styles/Home.module.scss"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getVideogames, filterVideogamesByOrigin } from "../actions"
import Card from "./Card"
import Paginado from "./Paginado"

function Home() {
  const dispatch = useDispatch()
  const allVideogames = useSelector((state) => state.videogames)

  const [currentPage, setCurrentPage] = useState(1)
  const videogamesPerPage = 15
  const indexLastVideogame = currentPage * videogamesPerPage
  const indexFirsVideogame = indexLastVideogame - videogamesPerPage
  const currentVideogames = allVideogames.slice(
    indexFirsVideogame,
    indexLastVideogame
  )

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getVideogames())
  }, [dispatch])

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(getVideogames())
  }

  const handleFilterOrigin = (e) => {
    e.preventDefault()
    dispatch(filterVideogamesByOrigin(e.target.value))
  }

  return (
    <>
      <div className={style.homeDiv}>
        <div>
          <Link to="/videogame">
            <button className={style.btnCreate}>Crear videojuego</button>
          </Link>
        </div>
        <h1 className={style.mainTitle}>VIDEOJUEGOS</h1>
        <div className={style.filterBar}>
          <select>
            <option value="ascNombre">Asc Alphabetic</option>
            <option value="desNombre">Des Alphabetic</option>
          </select>
          <select>
            <option value="ascRating">Asc Rating</option>
            <option value="desRating">Des Rating</option>
          </select>
          <select onChange={(e) => handleFilterOrigin(e)}>
            <option value="all">All</option>
            <option value="created">Created</option>
            <option value="api">Api</option>
          </select>
          <button onClick={(e) => handleClick(e)}>Borrar filtros</button>
        </div>

        <Paginado
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
        />

        <div className={style.cardSpace}>
          {currentVideogames?.map((el) => {
            return (
              <>
                <Card
                  name={el.name}
                  background_image={el.background_image}
                  genres={el.genres}
                  key={el.id}
                />
              </>
            )
          })}
        </div>
        <Paginado
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
        />
      </div>
    </>
  )
}

export default Home
