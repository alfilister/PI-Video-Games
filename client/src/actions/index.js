import axios from "axios"
const {
  GET_VIDEOGAMES,
  FILTER_BY_ORIGIN,
  SORT_ALPHABETIC,
  SORT_RATING,
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

export function filterVideogamesByOrigin(payload) {
  return {
    type: FILTER_BY_ORIGIN,
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
