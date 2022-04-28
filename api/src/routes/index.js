const { Router } = require("express")
const axios = require("axios")
const { Videogame, Genre } = require("../db")
const {
  getAllVideogames,
  getVideogameByName,
  getVideogameById,
  getGenres,
} = require("../controllers")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router()

router.get("/videogames", async (req, res, next) => {
  try {
    let totalVideogames = await getAllVideogames()
    const { name } = req.query

    if (name) {
      const response = getVideogameByName(name, totalVideogames)
      response.videoSlice
        ? res.status(200).json({
            status: "found",
            quantity_found: response.videoName.length,
            quantity_shown: response.videoSlice.length,
            data: response.videoSlice,
          })
        : res.status(404).json({ status: "notFound" })
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

    const response = await getVideogameById(id)

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
