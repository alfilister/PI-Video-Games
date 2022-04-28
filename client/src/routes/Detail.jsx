import style from "../styles/Detail.module.scss"
import React, { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteVideogame, getDetail, resetDetail } from "../redux/actions"
import { connect } from "react-redux"

export function Detail(props) {
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    props.getDetail(id)

    return () => {
      props.resetDetail()
    }
  }, [id])

  const { vGame } = props

  const handleDelete = (e, id) => {
    e.preventDefault(e)
    props.deleteVideogame(id)
    navigate("/home")
  }

  return (
    <>
      <div className={style.detailDiv}>
        {vGame.name ? (
          <div>
            <div className={style.detData}>
              <div className={style.detTitle}>
                <h1>{vGame.name}</h1>
              </div>
              {vGame.created_in_db && (
                <div className={style.btnDelete}>
                  <button onClick={(e) => handleDelete(e, id)}>
                    Delete Videogame
                  </button>
                </div>
              )}
              <div className={style.detImg}>
                <img
                  src={vGame.background_image}
                  alt="VideoImage"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src =
                      "https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg"
                  }}
                />
              </div>
              <div
                className={style.detText}
                dangerouslySetInnerHTML={{
                  __html: vGame.description,
                }}
              ></div>
            </div>
            <div className={style.detInfo}>
              <h4>
                <span>Rating: </span>
                {vGame.rating}
              </h4>
              <h4 className={style.detReleased}>
                <span>Released on: </span>
                {vGame.released}
              </h4>
              <h4 className={style.detGenres}>
                <span>Genres: </span>
                {!vGame.created_in_db
                  ? vGame.genres.join(" / ")
                  : vGame.genres.map((el) => el.name).join(" / ")}
              </h4>
              <h4 className={style.detPlatforms}>
                <span>Platforms: </span>
                {vGame.platforms.join(" / ")}
              </h4>
            </div>
          </div>
        ) : (
          <div className={style.response}>
            <h1>ID not found!</h1>
          </div>
        )}
        <div className={style.detBack}>
          <Link to="/home">
            <button>Back to Home</button>
          </Link>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  vGame: state.detail,
})

const mapDispatchToProps = (dispatch) => ({
  getDetail: (id) => dispatch(getDetail(id)),
  resetDetail: () => dispatch(resetDetail()),
  deleteVideogame: (id) => dispatch(deleteVideogame(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
