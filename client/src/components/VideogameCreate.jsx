import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { postVideogame, getPlatforms } from "../actions"

function VideogameCreate() {
  const dispatch = useDispatch()
  const genres = useSelector((state) => state.allgenres)
  const platforms = useSelector((state) => state.allplatforms)

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
    background_image: "",
  })

  useEffect(() => {
    dispatch(getPlatforms())
  }, [dispatch])

  return (
    <>
      <div>
        <div>
          <Link to="/home">
            <button>Back to home</button>
          </Link>
        </div>
        <h1>Create your videogame</h1>
        <form>
          <div>
            <input value={input.name} type="text" placeholder="Name" />
            <input
              value={input.description}
              type="text"
              placeholder="Description of your game"
            />
            <input value={input.released} type="date" />
            <input
              value={input.rating}
              type="text"
              placeholder="Between 0 and 5"
            />
            <select>
              <option disabled>Genres</option>
            </select>
            <select>
              <option disabled>Platforms</option>
            </select>
            <input
              value={input.background_image}
              type="text"
              placeholder="URL of your img"
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default VideogameCreate
