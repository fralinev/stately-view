"use client"

export default function Criterion({criterion, setCriterion}:any) {
  return (
    <>
    <div className="w-100 flex gap-10 px-10">
    <select
      value={criterion}
      onChange={(e) => setCriterion(e.target.value)}
      className="px-4 py-2 bg-gray-900 text-gray-100 border border-gray-700"
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