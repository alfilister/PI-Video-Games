import {
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
  POST_VIDEOGAME,
} from "../action-types"

const initialState = {
  videogames: [],
  allvideogames: [],
  videoreset: [],
  allgenres: [],
  allplatforms: [],
  videocharged: false,
  detail: [],
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        allvideogames: action.payload,
        videoreset: action.payload,
        videocharged: true,
      }

    case GET_VIDEOGAMES_BY_NAME:
      return {
        ...state,
        videogames: action.payload,
        allvideogames: action.payload,
      }

    case GET_GENRES:
      return {
        ...state,
        allgenres: action.payload,
      }

    case GET_PLATFORMS:
      const toGetPlatforms = state.allvideogames
      var platformsFinal = []
      toGetPlatforms.map((el) =>
        el.platforms.map(
          (el) => !platformsFinal.includes(el) && platformsFinal.push(el)
        )
      )
      return {
        ...state,
        allplatforms: platformsFinal,
      }

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      }

    case RESET_DETAIL:
      return {
        ...state,
        detail: [],
      }

    case RESET_FILTERS:
      const reset = state.videoreset
      return {
        ...state,
        videogames: reset,
      }

    case POST_VIDEOGAME:
      return { state }

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
