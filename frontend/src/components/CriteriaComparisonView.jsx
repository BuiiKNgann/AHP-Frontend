import React, { useState, useEffect } from "react";

const CriteriaComparisonView = ({
  criteria,
  matrix,
  columnSums,
  onMatrixChange,
  onNext,
}) => {
  const scaleValues = [
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1,
    1 / 2,
    1 / 3,
    1 / 4,
    1 / 5,
    1 / 6,
    1 / 7,
    1 / 8,
    1 / 9,
  ];

  const [normalizedMatrix, setNormalizedMatrix] = useState(
    Array(criteria.length)
      .fill()
      .map(() => Array(criteria.length).fill(0))
  );

  const [weights, setWeights] = useState(Array(criteria.length).fill(0));

  useEffect(() => {
    const normalized = Array(criteria.length)
      .fill()
      .map(() => Array(criteria.length).fill(0));

    for (let row = 0; row < criteria.length; row++) {
      for (let col = 0; col < criteria.length; col++) {
        normalized[row][col] = matrix[row][col] / columnSums[col];
      }
    }
    setNormalizedMatrix(normalized);

    const calculatedWeights = Array(criteria.length).fill(0);
    for (let row = 0; row < criteria.length; row++) {
      let sum = 0;
      for (let col = 0; col < criteria.length; col++) {
        sum += normalized[row][col];
      }
      calculatedWeights[row] = sum / criteria.length;
    }
    setWeights(calculatedWeights);
  }, [matrix, columnSums, criteria.length]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        So sánh tầm quan trọng của các tiêu chí
      </h2>

      {/* Ma trận so sánh cặp */}
      <h3 className="text-lg font-semibold mb-2">Ma trận so sánh cặp:</h3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full table-auto border-collapse mb-4">
          <thead>
            <tr>
              <th className="border px-2 py-1 bg-gray-100"></th>
              {criteria.map((criterion, index) => (
                <th key={index} className="border px-2 py-1 bg-gray-100">
                  {criterion}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th className="border px-2 py-1 bg-gray-100 text-left">
                  {criteria[rowIndex]}
                </th>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="border px-2 py-1">
                    {rowIndex === colIndex ? (
                      "1"
                    ) : rowIndex < colIndex ? (
                      <select
                        className="w-full p-1"
                        value={cell}
                        onChange={(e) =>
                          onMatrixChange(rowIndex, colIndex, e.target.value)
                        }
                      >
                        {scaleValues.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    ) : (
                      cell.toFixed(4)
                    )}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="bg-gray-200 font-bold">
              <td className="border px-2 py-1">Tổng cột</td>
              {columnSums.map((sum, index) => (
                <td key={index} className="border px-2 py-1 text-center">
                  {sum.toFixed(4)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Ma trận đã chuẩn hóa */}
      <h3 className="text-lg font-semibold mb-2">Ma trận đã chuẩn hóa:</h3>
      <div className="overflow-x-auto mb-6">
        <table className="w-full table-auto border-collapse mb-4">
          <thead>
            <tr>
              <th className="border px-2 py-1 bg-gray-100"></th>
              {criteria.map((criterion, index) => (
                <th key={index} className="border px-2 py-1 bg-gray-100">
                  {criterion}
                </th>
              ))}
              <th className="border px-2 py-1 bg-gray-100">Trọng số</th>
            </tr>
          </thead>
          <tbody>
            {normalizedMatrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th className="border px-2 py-1 bg-gray-100 text-left">
                  {criteria[rowIndex]}
                </th>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="border px-2 py-1 text-center">
                    {cell.toFixed(4)}
                  </td>
                ))}
                <td className="border px-2 py-1 text-center font-bold bg-blue-100">
                  {weights[rowIndex].toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Hướng dẫn:</h3>
        <p className="mb-4">
          So sánh tầm quan trọng tương đối của các tiêu chí. Giá trị từ 1 đến 9
          thể hiện mức độ quan trọng hơn, giá trị từ 1/9 đến 1 thể hiện mức độ
          quan trọng kém hơn.
        </p>
        {/* <p className="mb-4">
          <strong>Giải thích kết quả:</strong>
          <ul className="list-disc pl-5 mt-2">
            <li>
              Ma trận đã chuẩn hóa: Mỗi phần tử được tính bằng cách chia giá trị
              gốc cho tổng cột tương ứng
            </li>
            <li>
              Trọng số: Giá trị trung bình của các phần tử trong cùng một hàng
              của ma trận đã chuẩn hóa
            </li>
          </ul>
        </p> */}
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={onNext}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Tiếp theo
        </button>
      </div>
    </div>
  );
};

export default CriteriaComparisonView;
