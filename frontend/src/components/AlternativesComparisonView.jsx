import React from "react";

const AlternativesComparisonView = ({
  alternatives,
  criteria,
  currentCriterion,
  matrix,
  onMatrixChange,
  onNext,
  onPrev,
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

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        So sánh các lựa chọn theo tiêu chí: {criteria[currentCriterion]}
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse mb-4">
          <thead>
            <tr>
              <th className="border px-2 py-1 bg-gray-100"></th>
              {alternatives.map((alt, index) => (
                <th key={index} className="border px-2 py-1 bg-gray-100">
                  {alt}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <th className="border px-2 py-1 bg-gray-100 text-left">
                  {alternatives[rowIndex]}
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
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Hướng dẫn:</h3>
        <p className="mb-4">
          So sánh các lựa chọn với nhau dựa trên tiêu chí hiện tại. Giá trị từ 1
          đến 9 có nghĩa là tốt hơn, giá trị từ 1/9 đến 1 có nghĩa là kém hơn.
        </p>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={onPrev}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Quay lại
        </button>
        <button
          onClick={onNext}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {criteria.length - 1 === currentCriterion
            ? "Xem kết quả"
            : "Tiếp theo"}
        </button>
      </div>
    </div>
  );
};

export default AlternativesComparisonView;
