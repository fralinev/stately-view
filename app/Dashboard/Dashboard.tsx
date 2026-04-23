"use client"

import { useState, useEffect, useRef } from "react"
import SearchInput from "./SearchField.tsx/SearchField"
import Criterion from "./Criterion/Criterion"
import CountryView from "./CountryView/CountryView"
import ComparisonCriterion from "./ComparisonCriterion/ComparisonCriterion"
import Graph from "./Graph/Graph"

export default function Dashboard() {
  const [criterion, setCriterion] = useState<string>("")
  const [query, setQuery] = useState<string>("")
  const [list, setList] = useState(null)
  const [selected, setSelected] = useState([])
  const [comparisonCriterion, setComparisonCriterion] = useState("")


  useEffect(() => {

    if (!query || !criterion) return

    const timeout = setTimeout(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(
            `/api?criterion=${criterion}&query=${encodeURIComponent(query)}`
          )

          if (!res.ok) {
            throw new Error('Failed to fetch')
          }

          const data = await res.json()
          setList(data)
          console.log(data)
        } catch (err) {
          console.error(err)
        }
      }

      fetchData()
    }, 1000)

    return () => clearTimeout(timeout)
  }, [query, criterion])

  // console.log(country1)

  return (
    <>
      <div className="flex py-10">
        <div className="flex flex-col gap-10 py-10">
          <div>Select</div>
          <Criterion
            criterion={criterion}
            setCriterion={setCriterion}
          />
          <SearchInput
            query={query}
            setQuery={setQuery}
            list={list}
            setList={setList}
            setSelected={setSelected}
            
          />
          <div>Compare</div>
          <ComparisonCriterion 
          comparisonCriterion={comparisonCriterion}
          setComparisonCriterion={setComparisonCriterion}
          />
          <Graph comparisonCriterion={comparisonCriterion} selected={selected}/>

        </div>
        <CountryView selected={selected} setSelected={setSelected}/>

      </div>

    </>
  )
}