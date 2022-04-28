import axios from "axios"
const {
  GET_VIDEOGAMES,
  GET_VIDEOGAMES_BY_NAME,
  GET_GENRES,
  GET_PLATFORMS,
  GET_DETAIL,
  RESET_DETAIL,
  RESET_FILTERS,

  FILTER_BY_ORIGIN,
  FILTER_BY_GENRE,

  SORT_ALPHABETIC,
  SORT_RATING,
  SORT_GENRE,
} = require("../action-types")

export function getVideogames() {
  return async function (dispatch) {
    try {
      await fetch("http://localhost:3001/api/videogames")
        .then((response) => response.json())
        .then((info) => dispatch({ type: GET_VIDEOGAMES, payload: info.data }))
    } catch (err) {
      console.log(err)
    }
  }
}

export function getVideogamesByName(payload) {
  return async function (dispatch) {
    try {
      const info = await axios.get(
        `http://localhost:3001/api/videogames?name=${payload}`
      )
      return dispatch({
        type: GET_VIDEOGAMES_BY_NAME,
        payload: info.data.data,
      })
    } catch (error) {
      return alert("There is no coincidence by Name")
    }
  }
}

export function getGenres() {
  return async function (dispatch) {
    try {
      var genres = await axios.get("http://localhost:3001/api/genres")
      return dispatch({
        type: GET_GENRES,
        payload: genres.data,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export function getPlatforms() {
  return {
    type: GET_PLATFORMS,
  }
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      const detail = await axios.get(
        `http://localhost:3001/api/videogames/${id}`
      )
      return dispatch({
        type: GET_DETAIL,
        payload: detail.data,
      })
    } catch (err) {
      console.log("There is no match with any ID in our database")
    }
  }
}

export function resetDetail() {
  return {
    type: RESET_DETAIL,
  }
}

export function resetFilters() {
  return {
    type: RESET_FILTERS,
  }
}

export function postVideogame(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/videogame",
        payload
      )
      return response
    } catch (err) {
      console.log(err)
    }
  }
}

export function filterVideogamesByOrigin(payload) {
  return {
    type: FILTER_BY_ORIGIN,
    payload,
  }
}

export function filterVideogamesByGenre(payload) {
  return {
    type: FILTER_BY_GENRE,
    payload,
  }
}

export function sortVideogamesAz(payload) {
  return {
    type: SORT_ALPHABETIC,
    payload,
  }
}

export function sortVideogamesRating(payload) {
  return {
    type: SORT_RATING,
    payload,
  }
}

export function sortVideogamesGenre(payload) {
  return {
    type: SORT_GENRE,
    payload,
  }
}
