
export default function ComparisonCriterion({ comparisonCriterion, setComparisonCriterion }: any) {
  return (
    <>
      <div className="flex gap-5 px-10 items-center">
        <label htmlFor="search-criterion" className="text-gray-200">
          Comparison:
        </label>
        <select
          value={comparisonCriterion}
          onChange={(e) => setComparisonCriterion(e.target.value)}
          className="px-4 py-2 bg-gray-900 text-gray-100 border border-gray-700 w-40"
        >
          <option value="" disabled>Compare...</option>
          <option value="population">Population</option>
          <option value="languages">Languages</option>
          <option value="area">Area</option>
          <option value="borders">Neighbors</option>
        </select>
      </div>
    </>
  )
}