import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import instance from '../axios'
import movieTrailer from 'movie-trailer'
import '../styles/Rows.css'

const baseUrl = 'https://image.tmdb.org/t/p/original/'

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([])
  const [trailerUrl, setTrailerUrl] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const request = await instance.get(fetchUrl)
      let data = request.data.results
      setMovies(data)
      return request
    }

    fetchData()
  }, [fetchUrl])

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  }

  const handleClick = movie => {
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(movie?.name || '')
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search)
          setTrailerUrl(urlParams.get('v'))
        })
        .catch(error => console.log(error.message))
    }
  }

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map(movie => {
          let poster = isLargeRow ? movie.poster_path : movie.backdrop_path
          let src = `${baseUrl}${poster}`
          return (
            <img
              key={movie.id}
              className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
              src={src}
              alt={movie.name}
              onClick={() => handleClick(movie)}
            />
          )
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row
