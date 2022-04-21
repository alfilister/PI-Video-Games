import style from "../styles/Home.module.scss"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

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
          <h1>VIDEOJUEGOS</h1>
        </div>
        <SearchBar />
        <FilterBar />
      </div>
    </>
  )
}

export default Home
