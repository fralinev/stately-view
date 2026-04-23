"use client"
import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

export default function Graph({ comparisonCriterion, selected }: any) {
  if (selected.length < 2 || !comparisonCriterion) return null

  const data = useMemo(() => {
    return selected.map((country: any) => {
      const value =
        comparisonCriterion === "languages"
          ? Object.keys(country.languages || {}).length
          : comparisonCriterion === "borders"
            ? (country.borders || []).length
            : country[comparisonCriterion];

      return {
        name: country.name.common,
        value,
      };
    });
  }, [selected, comparisonCriterion]);

  return (
    <div>

      <BarChart width={400} height={300} data={data} margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>

    </div>
  )
}