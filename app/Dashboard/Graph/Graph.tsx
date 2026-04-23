import { BarChart, Bar, XAxis, YAxis } from "recharts";

export default function Graph({ comparisonCriterion, selected }: any) {
  if (selected.length < 2) return null

  const data = selected.map((country: any) => {
    const value = comparisonCriterion === "languages"
      ? Object.keys(country.languages).length
      : comparisonCriterion === "borders"
        ? country.borders.length
        : country[comparisonCriterion]
    return {
      name: country.name.common,
      value
    }
  });

  return (
    <div>

      <BarChart width={400} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>

    </div>
  )
}