"use client"

export default function SearchCriterion({ searchCriterion, setSearchCriterion }: any) {
  return (
    <>
      <div className="flex gap-5 px-10 items-center">
        <label htmlFor="search-criterion" className="text-gray-200">
          Search by:
        </label>
        <select
          id="search-criterion"
          value={searchCriterion}
          onChange={(e) => setSearchCriterion(e.target.value)}
          className="px-4 py-2 bg-gray-900 text-gray-100 border border-gray-700 w-40"
        >
          <option value="" disabled>Search by...</option>
          <option value="name">Name</option>
          <option value="language">Language</option>
          <option value="capital">Capital City</option>
        </select>
      </div>
    </>
  )
}