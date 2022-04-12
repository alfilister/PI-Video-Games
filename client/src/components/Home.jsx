import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getVideogames } from "../actions"
import Card from "./Card"
import style from "./styles/Home.module.scss"

function Home() {
  const dispatch = useDispatch()
  const allVideogames = useSelector((state) => state.videogames)

  useEffect(() => {
    dispatch(getVideogames())
  }, [dispatch])

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(getVideogames())
  }

  return (
    <>
      <div>
        <Link to="/videogame">Crear videojuego</Link>
        <h1>VIDEOJUEGOS</h1>
        <button onClick={(e) => handleClick(e)}>Borrar filtros</button>
        <div>
          <select>
            <option value="ascNombre">Asc Alphabetic</option>
            <option value="desNombre">Des Alphabetic</option>
          </select>
          <select>
            <option value="ascRating">Asc Rating</option>
            <option value="desRating">Des Rating</option>
          </select>
          <select>
            <option value="all">All</option>
            <option value="created">Created</option>
            <option value="api">Api</option>
          </select>
        </div>
        <div className={style.cardSpace}>
          {allVideogames &&
            allVideogames.map((el) => {
              return (
                <>
                  <Card
                    name={el.name}
                    background_image={el.background_image}
                    genres={el.genres}
                  />
                </>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default Home
