import { useEffect, useState } from "react"
import axios from "axios"

function usefetch(url) {
  const [data, setData] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    axios
      .get(url)
      .then(response => { setData(response); setIsLoaded(true) })
      .catch(err => setError(err))
      
  }, [url])

  const refetch = () => {
    setIsLoaded(false);
    axios
    .get(url)
    .then(response => { setData(response); setIsLoaded(true) })
    .catch(err => setError(err))
  };


  return { data, isLoaded, error, refetch }
}

export default usefetch