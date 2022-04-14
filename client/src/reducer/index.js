import {
  GET_VIDEOGAMES,
  FILTER_BY_ORIGIN,
  SORT_ALPHABETIC,
  SORT_RATING,
} from "../action-types"

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

    case SORT_ALPHABETIC:
      const sortedAzArr =
        (action.payload === "asc" &&
          state.videogames.sort((a, b) => {
            if (a.name > b.name) {
              return 1
            }
            if (b.name > a.name) {
              return -1
            }
            return 0
          })) ||
        (action.payload === "des" &&
          state.videogames.sort((a, b) => {
            if (a.name > b.name) {
              return -1
            }
            if (b.name > a.name) {
              return 1
            }
            return 0
          }))
      return {
        ...state,
        videogames: sortedAzArr,
      }

    case SORT_RATING:
      const sortedRatingArr =
        (action.payload === "asc" &&
          state.videogames.sort((a, b) => {
            if (a.rating > b.rating) {
              return 1
            }
            if (b.rating > a.rating) {
              return -1
            }
            return 0
          })) ||
        (action.payload === "des" &&
          state.videogames.sort((a, b) => {
            if (a.rating > b.rating) {
              return -1
            }
            if (b.rating > a.rating) {
              return 1
            }
            return 0
          }))
      return {
        ...state,
        videogames: sortedRatingArr,
      }

    default:
      return state
  }
}

export default rootReducer