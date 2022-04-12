import axios from "axios"

export function getVideogames() {
  return async function (dispatch) {
    try {
      var info = await axios.get("http://localhost:3001/api/videogames")
      return dispatch({
        type: "GET_VIDEOGAMES",
        payload: info.data.data,
      })
    } catch (err) {
      console.log(err)
    }
  }
}
