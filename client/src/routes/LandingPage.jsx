import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getGenres, getVideogames } from "../redux/actions"
import style from "../styles/LandingPage.module.scss"

function LandingPage() {
  const dispatch = useDispatch()
  let videogamesStatus = useSelector((state) => state.videocharged)

  const renderEnter = () => {
    return (
      <Link to="/home">
        <button>Enter</button>
      </Link>
    )
  }

  useEffect(() => {
    dispatch(getGenres())
    dispatch(getVideogames())
  }, [dispatch])

  return (
    <>
      <div className={style.landing}>
        <h1 className={style.video}>Video</h1>
        <h1 className={style.games}>Games</h1>
        {videogamesStatus && renderEnter()}
      </div>
    </>
  )
}

export default LandingPage
