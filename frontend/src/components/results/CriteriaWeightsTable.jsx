//Bảng trọng số tiêu chí
import React from "react";

const CriteriaWeightsTable = ({ criteria, weights, consistencyRatio }) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr>
              {criteria.map((criterion, index) => (
                <th key={index} className="border p-2 bg-gray-100">
                  {criterion}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {weights.map((weight, index) => (
                <td key={index} className="border p-2 text-center">
                  {weight.toFixed(4)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm">
        Tỷ số nhất quán (CR) = {consistencyRatio.toFixed(4)}
        <span
          className={
            consistencyRatio <= 0.1
              ? "text-green-600"
              : "text-red-600 font-semibold"
          }
        >
          {consistencyRatio <= 0.1
            ? " (Chấp nhận được)"
            : " (Không nhất quán, nên đánh giá lại)"}
        </span>
      </p>
    </div>
  );
};

export default CriteriaWeightsTable;
