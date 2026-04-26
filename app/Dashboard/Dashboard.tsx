"use client"

import SearchInput from "./SearchField/SearchField"
import SearchCriterion from "./SearchCriterion/SearchCriterion"
import CountryView from "./CountryView/CountryView"
import ComparisonCriterion from "./ComparisonCriterion/ComparisonCriterion"
import Graph from "./Graph/Graph"
import Section from "../components/Section"
import { useDashboard } from "../hooks/useDashboard"

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

  const {
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
  } = useDashboard()

  return (
    <>
      <div id="container" className="flex items-start py-10">
        <div id="left" className="flex flex-col gap-5 w-[40%] px-10">
          <Section text="Add a country to my list">
            <SearchCriterion
              searchCriterion={searchCriterion}
              setSearchCriterion={setSearchCriterion}
            />
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

          </Section>
          <Section text="Visualize my list">

            <div className="flex flex-col gap-20">
              <ComparisonCriterion
                comparisonCriterion={comparisonCriterion}
                setComparisonCriterion={setComparisonCriterion}
              />
              <Graph comparisonCriterion={comparisonCriterion} selected={selected} />
            </div>
          </Section>
        </div>
        <div id="right" className="flex justify-center w-[60%] items-start">
          <Section text="My list (drag and drop)">
            <CountryView selected={selected} setSelected={setSelected} />
          </Section>
        </div>
      </div>

    </>
  )
}