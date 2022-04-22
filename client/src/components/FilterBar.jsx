import style from "../styles/FilterBar.module.scss"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  getVideogames,
  getGenres,
  filterVideogamesByOrigin,
  filterVideogamesByGenre,
  sortVideogamesAz,
  sortVideogamesRating,
} from "../redux/actions"
import Card from "../components/Card"
import Paginado from "../components/Paginado"

function FilterBar() {
  const dispatch = useDispatch()
  const allVideogames = useSelector((state) => state.videogames)
  const allGenres = useSelector((state) => state.allgenres)

  const [origin, setOrigin] = useState("Filter By Origin")
  const [genre, setGenre] = useState("Filter By Genre")
  const [sortAz, setSortAz] = useState("Sort A-Z")
  const [sortRating, setSortRating] = useState("Sort Rating")

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
    dispatch(getGenres())
  }, [dispatch])

  const handleReset = (e) => {
    e.preventDefault()
    dispatch(getVideogames())
    setCurrentPage(1)
    setOrigin("Filter By Origin")
    setGenre("Filter By Genre")
    setSortAz("Sort A-Z")
    setSortRating("Sort Rating")
  }

  const handleFilterOrigin = (e) => {
    e.preventDefault()
    setOrigin(e.target.value)
    dispatch(filterVideogamesByOrigin(e.target.value))
  }

  const handleFilterGenre = (e) => {
    e.preventDefault()
    setGenre(e.target.value)
    dispatch(filterVideogamesByGenre(e.target.value))
  }

  const handleSortAz = (e) => {
    e.preventDefault()
    dispatch(sortVideogamesAz(e.target.value))
    setCurrentPage(1)
    setSortAz(e.target.value)
  }

  const handleSortRating = (e) => {
    e.preventDefault()
    dispatch(sortVideogamesRating(e.target.value))
    setCurrentPage(1)
    setSortRating(e.target.value)
  }

  return (
    <>
      <div className={style.filterBar}>
        <select value={sortAz} onChange={(e) => handleSortAz(e)}>
          <option disabled>Sort A-Z</option>
          <option value="asc">Asc</option>
          <option value="des">Des</option>
        </select>
        <select value={sortRating} onChange={(e) => handleSortRating(e)}>
          <option disabled>Sort Rating</option>
          <option value="asc">Asc</option>
          <option value="des">Des</option>
        </select>
        <select value={genre} onChange={(e) => handleFilterGenre(e)}>
          <option disabled>Filter By Genre</option>
          {allGenres.map((genre) => {
            return (
              <option key={genre} value={genre}>
                {genre}
              </option>
            )
          })}
        </select>
        <select value={origin} onChange={(e) => handleFilterOrigin(e)}>
          <option disabled>Filter By Origin</option>
          <option value="all">All</option>
          <option value="created">Created</option>
          <option value="api">Api</option>
        </select>
        <button onClick={(e) => handleReset(e)}>Reset Filters</button>
      </div>

      <Paginado
        videogamesPerPage={videogamesPerPage}
        allVideogames={allVideogames.length}
        paginado={paginado}
      />

      <div className={style.cardSpace}>
        {currentVideogames?.map((el) => {
          return (
            <div key={el.id}>
              <Link to={`/detail/${el.id}`} style={{ textDecoration: "none" }}>
                <Card
                  id={el.id}
                  rating={el.rating}
                  name={el.name}
                  background_image={el.background_image}
                  genres={
                    el.id.length > 25
                      ? el.genres.map((el) => el.name)
                      : el.genres
                  }
                />
              </Link>
            </div>
          )
        })}
      </div>
      <Paginado
        videogamesPerPage={videogamesPerPage}
        allVideogames={allVideogames.length}
        paginado={paginado}
      />
    </>
  )
}

export default FilterBar