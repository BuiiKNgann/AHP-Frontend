import React from "react";
import ScaleSelector from "./ScaleSelector";

const ComparisonMatrix = ({ rowLabels, colLabels, matrix, onMatrixChange }) => {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border p-2"></th>
            {colLabels.map((colLabel, index) => (
              <th key={index} className="border p-2 bg-gray-100">
                {colLabel}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowLabels.map((rowLabel, rowIndex) => (
            <tr key={rowIndex}>
              <th className="border p-2 bg-gray-100">{rowLabel}</th>
              {colLabels.map((colLabel, colIndex) => (
                <td key={colIndex} className="border p-2">
                  {rowIndex === colIndex ? (
                    <div className="text-center">1</div>
                  ) : rowIndex < colIndex ? (
                    <ScaleSelector
                      value={matrix[rowIndex][colIndex]}
                      onChange={(value) =>
                        onMatrixChange(rowIndex, colIndex, value)
                      }
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      {matrix[rowIndex][colIndex].toFixed(3)}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonMatrix;
