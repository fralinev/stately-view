"use client"
import { useEffect, useRef } from "react"

export default function SearchInput({ query, setQuery, list, setList, setSelected, setError, loading }: any) {
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
      <div className="w-100 flex gap-10 px-10">
        <div className="relative" ref={containerRef}>
          <input
            id="search"
            placeholder="find a country..."
            value={query}
            onChange={(e) => {
              setError("")
              setList([])
              setQuery(e.target.value)
            }}
            className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-700 
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          focus:border-blue-500 placeholder-gray-400"
          />
          {list?.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
              {list.map((country: any) => (
                <div
                  key={country.cca3}
                  className="px-4 py-2 hover:bg-gray-800 cursor-pointer"
                  onClick={() => {
                    setSelected((prev: any) => {
                      if (prev.some((el: any) => el.cca3 === country.cca3)) {
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

    </>
  )
}