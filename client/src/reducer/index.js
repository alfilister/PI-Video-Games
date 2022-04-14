import {
  GET_VIDEOGAMES,
  GET_VIDEOGAMES_BY_NAME,
  GET_GENRES,
  FILTER_BY_ORIGIN,
  FILTER_BY_GENRE,
  SORT_ALPHABETIC,
  SORT_RATING,
} from "../action-types"

const initialState = {
  videogames: [],
  allvideogames: [],
  allgenres: [],
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allvideogames: action.payload,
      }

    case GET_VIDEOGAMES_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
      }

    case GET_GENRES:
      return {
        ...state,
        allgenres: action.payload,
      }

    case FILTER_BY_ORIGIN:
      const toFilterByOrigin = state.allvideogames
      const originFiltered =
        (action.payload === "all" && toFilterByOrigin) ||
        (action.payload === "created" &&
          toFilterByOrigin.filter((el) => el.created_in_db)) ||
        (action.payload === "api" &&
          toFilterByOrigin.filter((el) => !el.created_in_db))

      return {
        ...state,
        videogames: originFiltered,
      }

    case FILTER_BY_GENRE:
      const toFilterByGenre = state.allvideogames
      const genreFiltered = toFilterByGenre.filter((el) =>
        el.genres.includes(action.payload)
      )

      return {
        ...state,
        videogames: genreFiltered,
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
