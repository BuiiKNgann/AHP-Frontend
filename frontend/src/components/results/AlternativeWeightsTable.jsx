import React from "react";

const AlternativeWeightsTable = ({
  criteria,
  alternatives,
  weights,
  consistencyRatios,
}) => {
  const shortNames = alternatives.map((alt) => alt.split(" - ")[0]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border p-2 bg-gray-100">Tiêu chí / Đối tượng</th>
            {shortNames.map((name, index) => (
              <th key={index} className="border p-2 bg-gray-100">
                {name}
              </th>
            ))}
            <th className="border p-2 bg-gray-100">CR</th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((criterion, criterionIndex) => (
            <tr key={criterionIndex}>
              <th className="border p-2 bg-gray-50">{criterion}</th>
              {weights[criterionIndex]?.map((weight, altIndex) => (
                <td key={altIndex} className="border p-2 text-center">
                  {weight.toFixed(4)}
                </td>
              ))}
              <td
                className={`border p-2 text-center ${
                  consistencyRatios[criterionIndex] <= 0.1
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {consistencyRatios[criterionIndex]?.toFixed(4)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlternativeWeightsTable;
