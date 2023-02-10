import { useEffect } from "react"
import axios from "axios"

function usefetch(url) {
  const [data, setData] = useEffect(null)
  const [loading, setLoading] = useEffect(false)
  const [error, setError] = useEffect(null)
  useEffect(() => {
    setLoading(true)
    axios
      .get(url)
      .then(response => setData(response))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [url])
return {data, loading, error}
}

export default usefetch