import { GET_VIDEOGAMES, FILTER_BY_ORIGIN } from "../action-types"

const initialState = {
  videogames: [],
  allvideogames: [],
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allvideogames: action.payload,
      }

    case FILTER_BY_ORIGIN:
      const allVideogames = state.allvideogames
      const originFiltered =
        (action.payload === "all" && allVideogames) ||
        (action.payload === "created" &&
          allVideogames.filter((el) => el.created_in_db)) ||
        (action.payload === "api" &&
          allVideogames.filter((el) => !el.created_in_db))

      return {
        ...state,
        videogames: originFiltered,
      }

    default:
      return state
  }
}

export default rootReducer
