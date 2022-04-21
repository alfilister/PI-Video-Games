import React, { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getDetail } from "../redux/actions"
import style from "../styles/Detail.module.scss"

function Detail() {
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    dispatch(getDetail(id))
  }, [id])

  const vGame = useSelector((state) => state.detail)

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
            <h1>ID not found in our database!</h1>
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

export default Detail
