import React, { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getDetail } from "../actions"

function Detail() {
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getDetail(id))
  }, [dispatch])

  const vGame = useSelector((state) => state.detail)

  return (
    <>
      <div>
        {vGame ? (
          <div>
            <div>
              <h1>{vGame.name}</h1>
              <h1>Rating: {vGame.rating} </h1>
            </div>
            <img src={vGame.background_image} alt="VideoImage" />
            <p>Released on {vGame.released}</p>
            <h5>
              Genres :{" "}
              {!vGame.created_in_db
                ? vGame.genres + " "
                : vGame.genres.map((el) => el.name + " ")}
            </h5>
            <h5>Platforms: {vGame.platforms}</h5>
            <p>{vGame.description}</p>
          </div>
        ) : (
          <p>Videogame not found</p>
        )}
        <Link to="/home">Back to Home</Link>
      </div>
    </>
  )
}

export default Detail
