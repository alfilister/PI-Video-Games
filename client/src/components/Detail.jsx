import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getDetail } from "../actions"

function Detail(props) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDetail(props.match.params.id))
  }, [dispatch])

  const videoSelected = useSelector((state) => state.detail)

  return (
    <>
      <div>
        {videoSelected.length > 0 ? (
          <div>
            <h1>{props.name}</h1>
          </div>
        ) : (
          false
        )}
      </div>
    </>
  )
}

export default Detail
