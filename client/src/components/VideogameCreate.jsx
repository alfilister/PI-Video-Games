import style from "./styles/VideogameCreate.module.scss"
import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { postVideogame, getPlatforms } from "../actions"

function VideogameCreate() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const allgenres = useSelector((state) => state.allgenres)
  const allplatforms = useSelector((state) => state.allplatforms)

  var genresSelected = []
  var platformsSelected = []

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

  const handleChange = (e) => {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  const changeColorBtn = (e) => {
    const element = document.getElementById(e.target.value)
    const elementClass = element.classList
    if (elementClass == "VideogameCreate_btnSelect__I9u2h") {
      element.classList.remove(elementClass)
      element.classList.add("VideogameCreate_btnChossen__lIR8R")
    } else {
      element.classList.remove(elementClass)
      element.classList.add("VideogameCreate_btnSelect__I9u2h")
    }
  }

  const handleGenre = (e) => {
    e.preventDefault()
    changeColorBtn(e)

    if (input.genres.includes(e.target.value)) {
      setInput({
        ...input,
        genres: input.genres.filter((el) => el !== e.target.value),
      })
    } else {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      })
    }
  }

  const handlePlatform = (e) => {
    e.preventDefault()
    changeColorBtn(e)
    if (input.platforms.includes(e.target.value)) {
      setInput({
        ...input,
        platforms: input.platforms.filter((el) => el !== e.target.value),
      })
    } else {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value],
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setInput({
      ...input,
      genres: genresSelected,
      platforms: platformsSelected,
    })
    dispatch(postVideogame(input))
    alert("Videogame succesfully created")
    setInput({
      name: "",
      description: "",
      released: "",
      rating: "",
      genres: [],
      platforms: [],
      background_image: "",
    })
  }

  return (
    <div className={style.generalCreate}>
      <div className={style.createDiv}>
        <div className={style.btnBack}>
          <Link to="/home">
            <button>Back to home</button>
          </Link>
        </div>
        <h1>Create your videogame</h1>
        <form>
          <div className={style.formElement}>
            <label>Name</label>
            <input
              name="name"
              onChange={(e) => handleChange(e)}
              value={input.name}
              type="text"
              placeholder="Videogame Name"
            />
          </div>
          <div className={style.formElement}>
            <label>Description</label>
            <input
              name="description"
              onChange={(e) => handleChange(e)}
              value={input.description}
              type="text"
              placeholder="Description of your game"
            />
          </div>
          <div className={style.formElement}>
            <label>Release Date</label>

            <input
              name="released"
              onChange={(e) => handleChange(e)}
              value={input.released}
              type="text"
              placeholder="dd/mm/yyyy"
            />
          </div>
          <div className={style.formElement}>
            <label>Rating</label>

            <input
              name="rating"
              onChange={(e) => handleChange(e)}
              value={input.rating}
              type="text"
              placeholder="Between 0 and 5"
            />
          </div>
          <div className={style.formElement}>
            <label>Image</label>

            <input
              name="background_image"
              onChange={(e) => handleChange(e)}
              value={input.background_image}
              type="text"
              placeholder="URL of the videogame img"
            />
          </div>
          <br />
          <h4>Choose the genres that apply to your videogame</h4>
          <br />
          <div className={style.formGenres}>
            {allgenres.sort().map((el) => {
              return (
                <>
                  <button
                    id={el}
                    className={style.btnSelect}
                    value={el}
                    onClick={(e) => handleGenre(e)}
                  >
                    {el}
                  </button>
                </>
              )
            })}
          </div>
          <br />
          <h4>Choose the platforms that support your videogame</h4>
          <br />
          <div className={style.formPlatforms}>
            {allplatforms.sort().map((el) => {
              return (
                <>
                  <button
                    id={el}
                    className={style.btnSelect}
                    value={el}
                    onClick={(e) => handlePlatform(e)}
                  >
                    {el}
                  </button>
                </>
              )
            })}
          </div>
          <br />
          <div className={style.finalBtn}>
            <button
              className={style.btnSubmit}
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Create Videogame
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VideogameCreate
