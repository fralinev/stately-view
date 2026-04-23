"use client"

export default function ComparisonCriterion({comparisonCriterion, setComparisonCriterion}:any) {
  return (
    <>
    <div className="w-100 flex gap-10 px-10">
    <select
      value={comparisonCriterion}
      onChange={(e) => setComparisonCriterion(e.target.value)}
      className="px-4 py-2 bg-gray-900 text-gray-100 border border-gray-700"
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