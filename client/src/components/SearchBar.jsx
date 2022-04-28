import style from "../styles/SearchBar.module.scss"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { getVideogamesByName } from "../redux/actions"

const validate = (input) => {
  let errorValidated = ""

  if (!input) {
    errorValidated = "Name is required to submit"
  } else if (!/^.{1,15}$/.test(input)) {
    errorValidated = "Max length 15 characters"
  } else if (!/^\S.*$/.test(input)) {
    errorValidated = "First character can not be an space"
  }
  return errorValidated
}

function SearchBar() {
  const dispatch = useDispatch()

  const [name, setName] = useState("")
  const [errors, setErrors] = useState("")

  const handleInputChange = (e) => {
    setName(e.target.value)
    setErrors(validate(e.target.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getVideogamesByName(name))
    setName("")
  }

  const handleKeyDown = (e) => {
    e.key === "Enter" && handleSubmit(e)
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className={style.srchBar}>
        <input
          value={name}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
          type="text"
          placeholder="Type to search by name"
        />
        <input
          disabled={errors && true}
          className={
            name === "" || errors !== "" ? style.btnDisabled : style.button
          }
          type="submit"
          value={errors ? errors : "Search by Name"}
        />
      </form>
    </>
  )
}

export default SearchBar
