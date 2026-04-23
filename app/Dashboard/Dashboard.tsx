"use client"

import { useState, useEffect } from "react"
import SearchInput from "./SearchField.tsx/SearchField"
import Criterion from "./Criterion/Criterion"
import CountryView from "./CountryView/CountryView"
import ComparisonCriterion from "./ComparisonCriterion/ComparisonCriterion"
import Graph from "./Graph/Graph"

export default function Dashboard() {
  const [criterion, setCriterion] = useState<string>("")
  const [query, setQuery] = useState<string>("")
  const [list, setList] = useState([])
  const [selected, setSelected] = useState([])
  const [comparisonCriterion, setComparisonCriterion] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)


  useEffect(() => {

    if (!query || !criterion) return
    setLoading(true)
    const timeout = setTimeout(() => {
      const fetchData = async () => {
        try {

          const res = await fetch(
            `/api?criterion=${criterion}&query=${encodeURIComponent(query)}`
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
  }, [query, criterion])

  return (
    <>
      <div className="flex py-10">
        <div className="flex flex-col gap-10 w-200 items-center">
          <div>Select</div>
          <Criterion
            criterion={criterion}
            setCriterion={setCriterion}
          />
          <div className="flex flex-col gap-2">
            <SearchInput
              query={query}
              setQuery={setQuery}
              list={list}
              setList={setList}
              setSelected={setSelected}
              setError={setError}
              loading={loading}

            />
            {error && <div className="text-red-500 pl-10">{error}</div>}
            {loading && (
              <div className="flex pl-10">
                <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            )}

          </div>
          <div>Compare</div>
          <ComparisonCriterion
            comparisonCriterion={comparisonCriterion}
            setComparisonCriterion={setComparisonCriterion}
          />
          <Graph comparisonCriterion={comparisonCriterion} selected={selected} />

        </div>
        <div className="flex items-center">
          <CountryView selected={selected} setSelected={setSelected} />
        </div>
      </div>

    </>
  )
}