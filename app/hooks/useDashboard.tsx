import { useEffect, useState } from "react";
import type { Country, ComparisonCriterion } from "../Dashboard/Dashboard";


export const useDashboard = () => {
  const [searchCriterion, setSearchCriterion] = useState<string>("name")
  const [query, setQuery] = useState<string>("")
  const [list, setList] = useState<Country[]>([])
  const [selected, setSelected] = useState<Country[]>([])
  const [comparisonCriterion, setComparisonCriterion] = useState<ComparisonCriterion | "">("population");
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {

    if (!query || !searchCriterion) {
      setLoading(false);
      setList([]);
      setError("");
      return;
    }
    setLoading(true)
    const timeout = setTimeout(() => {
      const fetchData = async () => {
        try {

          const res = await fetch(
            `/api?criterion=${searchCriterion}&query=${encodeURIComponent(query)}`
          )

          if (res.status === 404) {
            setLoading(false)
            setError("No country found");
            setList([]);
            return;
          }

          if (!res.ok) {
            setLoading(false)
            throw new Error('Failed to fetch')
          }


          const data = await res.json()
          setList(data)
          setLoading(false)
          setError("");
          console.log(data)
        } catch (err) {
          setLoading(false)
          console.error(err)
        }
      }

      fetchData()
    }, 1000)

    return () => clearTimeout(timeout)
  }, [query, searchCriterion])

  return {
    searchCriterion,
    setSearchCriterion,
    query,
    setQuery,
    list,
    setList,
    selected,
    setSelected,
    comparisonCriterion,
    setComparisonCriterion,
    error,
    setError,
    loading,
  }
}