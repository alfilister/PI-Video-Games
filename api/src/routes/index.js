const { Router } = require("express")
const axios = require("axios")
const { Videogame, Genre } = require("../db")
const { API_KEY } = process.env

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
  try {
    var first100 = []

    for (let i = 1; i <= 5; i++) {
      let apiUrl = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
      )

      let apiInfo = apiUrl.data.results.map((el) => {
        return {
          id: el.id,
          background_image: el.background_image,
          name: el.name,
          description: el.description,
          released: el.released,
          rating: el.rating,
          platforms: el.platforms.map((el) => el.platform.name),
          genres: el.genres.map((el) => el.name),
        }
      })

      first100 = first100.concat(apiInfo)
    }

    return first100
  } catch (err) {
    next(err)
  }
}

const getDbInfo = async () => {
  try {
    return await Videogame.findAll({
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    })
  } catch (err) {
    next(err)
  }
}

const getAllVideogames = async () => {
  try {
    let apiInfo = await getApiInfo()
    let dbInfo = await getDbInfo()

    const totalInfo = dbInfo.concat(apiInfo)

    return totalInfo
  } catch (err) {
    next(err)
  }
}

const getVideoName = async (id) => {
  try {
    let idData = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    )
    let response = idData.data

    if (response) {
      let newFormat = {
        background_image: response.background_image,
        name: response.name,
        description: response.description,
        released: response.released,
        rating: response.rating,
        platforms: response.platforms.map((el) => el.platform.name),
        genres: response.genres.map((el) => el.name),
      }

      return newFormat
    } else {
      return undefined
    }
  } catch (err) {
    console.log(err)
  }
}

const getGenres = async () => {
  try {
    const genresApi = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    )

    const response = genresApi.data.results.map((el) => el.name)

    const resInDb = await response.forEach((el) => {
      Genre.findOrCreate({
        where: { name: el },
      })
    })

    return response
  } catch (err) {
    next(err)
  }
}

router.get("/videogames", async (req, res, next) => {
  try {
    let totalVideogames = await getAllVideogames()
    const { name } = req.query

    if (name) {
      const videoName = totalVideogames.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      )
      if (videoName.length) {
        let videoSlice = videoName.slice(0, 15)
        res.status(200).json({
          status: "found",
          quantity_found: videoName.length,
          quantity_shown: videoSlice.length,
          data: videoSlice,
        })
      } else {
        res.status(404).json({ status: "notFound" })
      }
    } else {
      res.status(200).json({
        length: totalVideogames.length,
        data: totalVideogames,
      })
    }
  } catch (err) {
    next(err)
  }
})

router.get("/videogames/:id", async (req, res, next) => {
  try {
    const { id } = req.params

    const response = await getVideoName(id)

    response
      ? res.status(200).send(response)
      : res.status(404).send("ID not found")
  } catch (err) {
    next(err)
  }
})

router.get("/genres", async (req, res, next) => {
  try {
    const response = await getGenres()
    res.send(response)
  } catch (err) {
    next(err)
  }
})

router.post("/videogame", async (req, res, next) => {
  try {
    const {
      name,
      background_image,
      description,
      released,
      rating,
      platforms,
      genres,
    } = req.body

    let videoCreated = await Videogame.create({
      name,
      background_image,
      description,
      released,
      rating,
      platforms,
    })

    let genresDb = await Genre.findAll({
      where: { name: genres },
    })

    videoCreated.addGenre(genresDb)

    res.json({
      status: "Videogame succesfully created",
      dataProvided: videoCreated,
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
