"use client"
import { useEffect, useRef, Dispatch, SetStateAction } from "react"
import type { Country } from "../Dashboard";

type SearchInputProps = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  list: Country[];
  setList: Dispatch<SetStateAction<Country[]>>;
  setSelected: Dispatch<SetStateAction<Country[]>>;
  setError: Dispatch<SetStateAction<string>>;
};

export default function SearchInput({ query, setQuery, list, setList, setSelected, setError }: SearchInputProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setList([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className=" flex gap-10 px-10">
        <div className="relative flex items-center gap-5" ref={containerRef}>
          <label htmlFor="search-criterion" className="text-gray-200">
            Query:
          </label>
          <div className="relative">
          <input
            id="search"
            placeholder="find a country..."
            autoFocus
            value={query}
            onChange={(e) => {
              setError("")
              setList([])
              setQuery(e.target.value)
            }}
            className="w-47 px-4 py-2 bg-gray-900 text-white border border-gray-700 
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          focus:border-blue-500 placeholder-gray-400"
          />
          {list?.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              {list.map((country: Country) => (
                <div
                  key={country.cca3}
                  className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                  onClick={() => {
                    setSelected((prev: Country[]) => {
                      if (prev.some((el: Country) => el.cca3 === country.cca3)) {
                        return prev;
                      }
                      return [...prev, country]
                    })
                    setQuery("")
                    setList([])
                  }}
                >
                  {country.name.common}
                </div>
              ))}
            </div>
          )}
          </div>
        </div>
      </div>

    </>
  )
}