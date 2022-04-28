import style from "../styles/Detail.module.scss"
import React, { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { getDetail, resetDetail } from "../redux/actions"
import { connect } from "react-redux"

export function Detail(props) {
  const { id } = useParams()

  useEffect(() => {
    props.getDetail(id)

    return () => {
      props.resetDetail()
    }
  }, [id])

  const { vGame } = props

  return (
    <>
      <div className={style.detailDiv}>
        {vGame.name ? (
          <div>
            <div className={style.detData}>
              <div className={style.detTitle}>
                <h1>{vGame.name}</h1>
              </div>
              <div className={style.detImg}>
                <img src={vGame.background_image} alt="VideoImage" />
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
