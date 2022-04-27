import style from "../styles/VideogameCreate.module.scss"
import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  postVideogame,
  getPlatforms,
  getGenres,
  getVideogames,
} from "../redux/actions"

const validate = (input) => {
  let errors = {}
  if (!input.name) {
    errors.name = "Name is required to submit"
  } else if (!/^.{1,25}$/.test(input.name)) {
    errors.name = "Max length 25 characters"
  } else if (!/^\S.*$/.test(input.name))
    errors.name = "First character can not be an space"
  if (!input.description) {
    errors.description = "description is required to submit"
  } else if (!/^.{1,100}$/.test(input.description)) {
    errors.description = "Max length 100 characters"
  } else if (!/^\S.*$/.test(input.description))
    errors.description = "First character could not be an space"
  if (!input.released) {
    errors.released = "released is required to submit"
  } else if (
    !/^([1-9]|0[1-9]|1[012])([-])([1-9]|0[1-9]|[12][0-9]|3[01])\2(\d{4})$|^(\d{4})([-])([1-9]|0[1-9]|[12][0-9]|3[01])\6([1-9]|0[1-9]|[12][0-9]|3[01])$/.test(
      input.released
    )
  ) {
    errors.released = "the expected format of the date is yyyy-mm-dd"
  }
  if (!input.rating) {
    errors.rating = "rating is required to submit"
  } else if (!/((?=5)^[0-5]?$|^[0-4](\.[0-9]?)?$)/.test(input.rating))
    errors.rating = "rating must be 0 to 5 range with max one decimal"

  if (input.genres.length === 0) {
    errors.genres = "at least one genre is required to submit"
  }
  if (input.platforms.length === 0) {
    errors.platforms = "at least one platform is required to submit"
  }
  if (!input.background_image) {
    errors.background_image = "image URL is required to submit"
  } else if (
    !/(https?:\/\/.*\.(?:png|jpg|jpeg))/i.test(input.background_image) ||
    /\s+\S*$/.test(input.background_image)
  ) {
    errors.background_image =
      "here you have to input a valid URL format to png, jpg or jpeg without initial or final space"
  } else if (!/^\S.*$/.test(input.background_image))
    errors.background_image = "First character could not be an space"
  return errors
}

function VideogameCreate() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const chargeList = async () => {
    await dispatch(getVideogames())
    dispatch(getPlatforms())
  }

  useEffect(() => {
    !allvideogames.length ? chargeList() : dispatch(getPlatforms())
    !allgenres.length && dispatch(getGenres())
  }, [dispatch])

  const allvideogames = useSelector((state) => state.videogames)
  const allgenres = useSelector((state) => state.allgenres)
  const allplatforms = useSelector((state) => state.allplatforms)

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
    background_image: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    )
  }

  const changeColorBtn = (e) => {
    const element = document.getElementById(e.target.value)
    const elementClass = element.classList
    if (elementClass == "VideogameCreate_btnSelect__6cbqd") {
      element.classList.remove(elementClass)
      element.classList.add("VideogameCreate_btnChossen__c4ust")
    } else {
      element.classList.remove(elementClass)
      element.classList.add("VideogameCreate_btnSelect__6cbqd")
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
    setErrors(
      validate({
        ...input,
        genres: e.target.value,
      })
    )
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
    setErrors(
      validate({
        ...input,
        platforms: e.target.value,
      })
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      errors.name ||
      errors.description ||
      errors.released ||
      errors.rating ||
      errors.background_image ||
      errors.genres ||
      errors.platforms
    ) {
      alert(`Missing information in the form, please review again`)
    } else {
      dispatch(postVideogame(input))
      alert("Videogame succesfully created")
      navigate("/home")
    }
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
          <div
            className={
              !errors.name ? style.formElement : style.formElementAlert
            }
          >
            <label>Name</label>
            <input
              key="name"
              name="name"
              onChange={(e) => handleChange(e)}
              value={input.name}
              type="text"
              placeholder="Name of your videogame"
            />
            {errors.name && <p className={style.errText}>{errors.name}</p>}
          </div>
          <div
            className={
              !errors.description ? style.formElement : style.formElementAlert
            }
          >
            <label>Description</label>
            <textarea
              key="description"
              name="description"
              onChange={(e) => handleChange(e)}
              value={input.description}
              type="text"
              placeholder="Description of your game"
            />
            {errors.description && (
              <p className={style.errText}>{errors.description}</p>
            )}
          </div>
          <div
            className={
              !errors.released ? style.formElement : style.formElementAlert
            }
          >
            <label>Release Date</label>

            <input
              key="released"
              name="released"
              onChange={(e) => handleChange(e)}
              value={input.released}
              type="date"
              min={"1952-01-01"}
              max={"2022-05-31"}
            />

            {errors.released && (
              <p className={style.errText}>{errors.released}</p>
            )}
          </div>
          <div
            className={
              !errors.rating ? style.formElement : style.formElementAlert
            }
          >
            <label>Rating</label>

            <input
              key="rating"
              name="rating"
              onChange={(e) => handleChange(e)}
              value={input.rating}
              type="text"
              placeholder="Between 0 and 5"
            />
            {errors.rating && <p className={style.errText}>{errors.rating}</p>}
          </div>
          <div
            className={
              !errors.background_image
                ? style.formElement
                : style.formElementAlert
            }
          >
            <label>Image</label>

            <textarea
              key="background_image"
              name="background_image"
              onChange={(e) => handleChange(e)}
              value={input.background_image}
              type="text"
              placeholder="URL of the videogame image"
            />
            {errors.background_image && (
              <p className={style.errText}>{errors.background_image}</p>
            )}
          </div>
          <br />
          <h4 className={!errors.genres ? style.h4 : style.h4alert}>
            Choose the genres that apply to your videogame
          </h4>
          {!input.genres[0] && <p className={style.errText}>{errors.genres}</p>}
          <br />
          <div className={style.formGenres}>
            {allgenres.sort().map((el) => {
              return (
                <div key={el}>
                  <button
                    id={el}
                    className={style.btnSelect}
                    value={el}
                    onClick={(e) => handleGenre(e)}
                  >
                    {el}
                  </button>
                </div>
              )
            })}
          </div>
          <br />
          <h4 className={!errors.platforms ? style.h4 : style.h4alert}>
            Choose the platforms that support your videogame
          </h4>
          {!input.platforms[0] && (
            <p className={style.errText}>{errors.platforms}</p>
          )}
          <br />
          <div className={style.formPlatforms}>
            {allplatforms.sort().map((el) => {
              return (
                <div key={el}>
                  <button
                    id={el}
                    className={style.btnSelect}
                    value={el}
                    onClick={(e) => handlePlatform(e)}
                  >
                    {el}
                  </button>
                </div>
              )
            })}
          </div>
          <br />
          <div className={style.finalBtn}>
            <input
              disabled={
                input.name === "" ||
                input.description === "" ||
                input.released === "" ||
                input.rating === "" ||
                !input.genres[0] ||
                !input.platforms[0] ||
                input.background_image === ""
                  ? true
                  : false
              }
              className={
                input.name === "" ||
                input.description === "" ||
                input.released === "" ||
                input.rating === "" ||
                !input.genres[0] ||
                !input.platforms[0] ||
                input.background_image === ""
                  ? style.btnSubmitDisabled
                  : style.btnSubmit
              }
              type="submit"
              onClick={(e) => handleSubmit(e)}
              value="Create"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default VideogameCreate
