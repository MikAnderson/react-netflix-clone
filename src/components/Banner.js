import React, { useEffect, useState } from 'react'
import axios from '../axios'
import requests from '../requests'
import '../styles/Banner.css'

const Banner = () => {
  const [movie, setMovie] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(requests.fetchTrending)

      // picking a random movie to be placed as a banner randomly
      let movieBanner =
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]

      setMovie(movieBanner)
      return request
    }

    fetchData()
  }, [])

  // if the description of the movie on the banner is to long
  // truncate if and append ... to it's end
  const truncateBannerDescription = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string
  }

  let baseUrl = 'https://image.tmdb.org/t/p/original/'
  let backgroundImageUrl = `${baseUrl}${movie?.backdrop_path}`
  let bannerTitle = movie?.title || movie?.name || movie?.original_name

  const style = {
    backgroundSize: 'cover',
    backgroundImage: `url(${backgroundImageUrl})`,
  }

  return (
    <header className="banner" style={style}>
      <div className="banner__contents">
        <h1 className="banner__title">{bannerTitle}</h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>

        <h1 className="banner__description">
          {truncateBannerDescription(movie?.overview, 200)}
        </h1>
      </div>
      <div className="banner__fadeBottom" />
    </header>
  )
}

export default Banner
