"use client"

import { useState, useEffect } from "react"
import SearchInput from "./SearchField/SearchField"
import SearchCriterion from "./SearchCriterion/SearchCriterion"
import CountryView from "./CountryView/CountryView"
import ComparisonCriterion from "./ComparisonCriterion/ComparisonCriterion"
import Graph from "./Graph/Graph"

export type Country = {
  cca3: string;
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  population: number;
  languages: string[];
  borders: string[];
  area: number;
  flags: {
    svg: string
  }
};

export type ComparisonCriterion = "languages" | "borders" | "population" | "area";

export default function Dashboard() {
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

  return (
    <>
      <div className="flex py-10">
        <div className="flex flex-col gap-5 w-1/2 items-center px-10">
          <div className="px-10 py-3 bg-blue-900/30 text-blue-200 font-semibold ">
            Add a country to the list
          </div>
          <SearchCriterion
            searchCriterion={searchCriterion}
            setSearchCriterion={setSearchCriterion}
          />
          <div className="flex flex-col gap-2">
            <SearchInput
              query={query}
              setQuery={setQuery}
              list={list}
              setList={setList}
              setSelected={setSelected}
              setError={setError}

            />
            {error && <div className="text-red-500 pl-10">{error}</div>}
            {loading && (
              <div className="pl-27">
                <div className="flex items-center gap-3 px-4 py-2 bg-blue-900/30 border border-blue-800/40 rounded-md w-fit">
                  <div className="w-5 h-5 border-2 border-blue-800 border-t-blue-400 rounded-full animate-spin"></div>
                  <span className="text-blue-200 text-sm">Loading...</span>
                </div>
              </div>
            )}

          </div>
          <div className="px-10 py-3 bg-blue-900/30 text-blue-200 font-semibold mt-20">
            Visualize the countries in the list
          </div>
          <div className="flex flex-col gap-20">
            <ComparisonCriterion
              comparisonCriterion={comparisonCriterion}
              setComparisonCriterion={setComparisonCriterion}
            />
            <Graph comparisonCriterion={comparisonCriterion} selected={selected} />
          </div>
        </div>
        <div className="flex justify-center w-1/2">
          <CountryView selected={selected} setSelected={setSelected} />
        </div>
      </div>

    </>
  )
}