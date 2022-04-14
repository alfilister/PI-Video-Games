import axios from "axios"
const {
  GET_VIDEOGAMES,
  GET_VIDEOGAMES_BY_NAME,
  GET_GENRES,
  FILTER_BY_ORIGIN,
  FILTER_BY_GENRE,
  SORT_ALPHABETIC,
  SORT_RATING,
  SORT_GENRE,
} = require("../action-types")

export function getVideogames() {
  return async function (dispatch) {
    try {
      var info = await axios.get("http://localhost:3001/api/videogames")
      return dispatch({
        type: GET_VIDEOGAMES,
        payload: info.data.data,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export function getVideogamesByName(payload) {
  return async function (dispatch) {
    try {
      var info = await axios.get(
        `http://localhost:3001/api/videogames?name=${payload}`
      )
      if (info.data.status === "notFound") {
        return alert("")
      }
      return dispatch({
        type: GET_VIDEOGAMES_BY_NAME,
        payload: info.data.data,
      })
    } catch (err) {
      console.log(err)
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
