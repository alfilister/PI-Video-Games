import style from "../styles/Home.module.scss"
import React from "react"
import { Link } from "react-router-dom"

import SearchBar from "../components/SearchBar"
import FilterBar from "../components/FilterBar"

function Home() {
  return (
    <>
      <div className={style.homeDiv}>
        <div className={style.btnCreate}>
          <Link to="/create">
            <button>Create New Videogame</button>
          </Link>
        </div>
        <div className={style.divTitle}>
          <h1>VIDEOGAMES</h1>
        </div>
        <SearchBar />
        <FilterBar />
        <br />
        <br />
      </div>
    </>
  )
}

export default Home
