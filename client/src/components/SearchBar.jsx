import style from "../styles/SearchBar.module.scss"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { getVideogamesByName } from "../redux/actions"

function SearchBar() {
  const dispatch = useDispatch()

  const [name, setName] = useState("")

  const handleInputChange = (e) => {
    setName(e.target.value)
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
      <div className={style.srchBar}>
        <input
          value={name}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
          type="text"
          placeholder="Type to search by name"
        />
        <button
          onClick={(e) => handleSubmit(e)}
          disabled={!name.length && true}
          className={name === "" ? style.btnDisabled : style.button}
          type="submit"
        >
          Search
        </button>
      </div>
    </>
  )
}

export default SearchBar
