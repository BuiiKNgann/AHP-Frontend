import React from "react";

const ResultsView = ({
  criteria,
  alternatives,
  criteriaWeights,
  alternativeWeights,
  finalScores,
  consistencyRatio,
  alternativeCRs,
  weightedSumValues,
  consistencyVector,
  lambdaMax,
  onPrev,
}) => {
  const maxScoreIndex = finalScores.indexOf(Math.max(...finalScores));

  // Tạo bảng xếp hạng dựa trên điểm số
  const rankings = finalScores
    .map((score, i) => ({ score, index: i, alternative: alternatives[i] }))
    .sort((a, b) => b.score - a.score);

  // Tìm lựa chọn tốt nhất
  const bestAlternative = rankings[0];

  // Tính sự chênh lệch giữa lựa chọn tốt nhất và các lựa chọn khác
  const differences = rankings.slice(1).map((alt) => {
    const diffPercent = (
      ((bestAlternative.score - alt.score) / bestAlternative.score) *
      100
    ).toFixed(2);
    return {
      ...alt,
      difference: bestAlternative.score - alt.score,
      diffPercent,
    };
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Kết quả phân tích AHP</h2>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Trọng số của các tiêu chí</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Tiêu chí</th>
                <th className="py-2 px-4 border">Trọng số</th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((criterion, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border">{criterion}</td>
                  <td className="py-2 px-4 border">
                    {criteriaWeights[index]?.toFixed(4) || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-2"></div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Thông tin vector nhất quán</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Tiêu chí</th>
                <th className="py-2 px-4 border">Weighted Sum Value</th>
                <th className="py-2 px-4 border">Trọng số</th>
                <th className="py-2 px-4 border">Consistency Vector</th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((criterion, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border">{criterion}</td>
                  <td className="py-2 px-4 border">
                    {weightedSumValues[index]?.toFixed(4) || "-"}
                  </td>
                  <td className="py-2 px-4 border">
                    {criteriaWeights[index]?.toFixed(4) || "-"}
                  </td>
                  <td className="py-2 px-4 border">
                    {consistencyVector[index]?.toFixed(4) || "-"}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-2 px-4 border font-medium">Lambda Max:</td>
                <td className="py-2 px-4 border font-medium" colSpan="3">
                  {lambdaMax?.toFixed(4) || "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p className="font-medium">
        Consistency Ratio: {consistencyRatio?.toFixed(4) || "-"}
        {consistencyRatio > 0.1 ? (
          <span className="text-red-500 ml-2">
            (Không nhất quán, xem xét nhập lại dữ liệu)
          </span>
        ) : (
          <span className="text-green-500 ml-2">(Nhất quán)</span>
        )}
      </p>
      <div className="mt-6 mb-6">
        <h3 className="text-lg font-medium mb-2">
          Kiểm tra tính nhất quán cho từng tiêu chí
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Tiêu chí</th>
                <th className="py-2 px-4 border">Consistency Ratio</th>
                <th className="py-2 px-4 border">Nhận xét</th>
              </tr>
            </thead>
            <tbody>
              {criteria.map((criterion, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border">{criterion}</td>
                  <td className="py-2 px-4 border">
                    {alternativeCRs[index]?.toFixed(4) || "-"}
                  </td>
                  <td className="py-2 px-4 border">
                    {alternativeCRs[index] > 0.1 ? (
                      <span className="text-red-500">
                        Không nhất quán, xem xét nhập lại dữ liệu
                      </span>
                    ) : (
                      <span className="text-green-500">Nhất quán</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">
          Trọng số cho từng lựa chọn đối với từng tiêu chí
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Lựa chọn / Tiêu chí</th>
                {criteria.map((criterion, index) => (
                  <th key={index} className="py-2 px-4 border">
                    {criterion}
                    <div className="text-xs">
                      (Trọng số: {criteriaWeights[index]?.toFixed(3) || "-"})
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {alternatives.map((alternative, altIndex) => (
                <tr key={altIndex}>
                  <td className="py-2 px-4 border">{alternative}</td>
                  {criteria.map((criterion, critIndex) => (
                    <td
                      key={critIndex}
                      className="py-2 px-4 border text-center"
                    >
                      {alternativeWeights[critIndex]?.[altIndex]?.toFixed(4) ||
                        "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Điểm số cuối cùng</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Lựa chọn</th>
                {criteria.map((criterion, index) => (
                  <th key={index} className="py-2 px-4 border text-center">
                    {criterion}
                    <br />
                    <span className="text-xs">
                      (Trọng số: {criteriaWeights[index]?.toFixed(3) || "-"})
                    </span>
                  </th>
                ))}
                <th className="py-2 px-4 border">Điểm tổng hợp</th>
                <th className="py-2 px-4 border">Xếp hạng</th>
              </tr>
            </thead>
            <tbody>
              {alternatives.map((alternative, altIndex) => (
                <tr
                  key={altIndex}
                  className={altIndex === maxScoreIndex ? "bg-green-100" : ""}
                >
                  <td className="py-2 px-4 border">{alternative}</td>
                  {criteria.map((criterion, critIndex) => {
                    // Tính điểm số cho từng tiêu chí = trọng số lựa chọn * trọng số tiêu chí
                    const score =
                      alternativeWeights[critIndex]?.[altIndex] *
                      criteriaWeights[critIndex];
                    return (
                      <td
                        key={critIndex}
                        className="py-2 px-4 border text-center"
                      >
                        {score?.toFixed(4) || "-"}
                      </td>
                    );
                  })}
                  <td className="py-2 px-4 border font-medium">
                    {finalScores[altIndex]?.toFixed(4) || "-"}
                  </td>
                  <td className="py-2 px-4 border font-medium">
                    {finalScores
                      .map((score, i) => ({ score, index: i }))
                      .sort((a, b) => b.score - a.score)
                      .findIndex((item) => item.index === altIndex) + 1}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Phần kết luận */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <h3 className="text-lg font-medium mb-2">Kết luận</h3>
        <div>
          {consistencyRatio > 0.1 || alternativeCRs.some((cr) => cr > 0.1) ? (
            <p className="text-red-600 font-medium mb-2">
              Lưu ý: Một số ma trận so sánh có tỷ lệ nhất quán cao hơn 0.1, điều
              này có thể ảnh hưởng đến độ tin cậy của kết quả.
            </p>
          ) : null}

          <p className="mb-2">
            <strong>Lựa chọn tốt nhất: </strong>
            <span className="font-medium text-green-700">
              {bestAlternative.alternative}
            </span>{" "}
            với điểm số{" "}
            <span className="font-medium">
              {bestAlternative.score.toFixed(4)}
            </span>
          </p>

          <p className="mb-2">
            <strong>Các tiêu chí có ảnh hưởng lớn nhất:</strong>{" "}
            {criteriaWeights
              .map((weight, index) => ({ weight, criterion: criteria[index] }))
              .sort((a, b) => b.weight - a.weight)
              .slice(0, Math.min(3, criteria.length))
              .map((item, index) => (
                <span key={index}>
                  {item.criterion} ({(item.weight * 100).toFixed(2)}%)
                  {index < Math.min(3, criteria.length) - 1 ? ", " : ""}
                </span>
              ))}
          </p>

          {differences.length > 0 && (
            <div className="mt-2">
              <p className="font-medium">So sánh với các lựa chọn khác:</p>
              <ul className="list-disc ml-6 mt-1">
                {differences.map((diff, index) => (
                  <li key={index}>
                    <span className="font-medium">{diff.alternative}</span> thấp
                    hơn{" "}
                    <span className="text-green-700 font-medium">
                      {bestAlternative.alternative}
                    </span>{" "}
                    với <span>{diff.diffPercent}%</span> (điểm số:{" "}
                    {diff.score.toFixed(4)})
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-3">
            <strong>Nhận xét:</strong> Dựa trên phương pháp AHP đã thực hiện,{" "}
            <span className="font-medium text-green-700">
              {bestAlternative.alternative}
            </span>{" "}
            là lựa chọn được đánh giá cao nhất
            {differences.length > 0 && differences[0].diffPercent < 5
              ? `, tuy nhiên ${differences[0].alternative} cũng là một lựa chọn khá tốt với điểm số gần tương đương.`
              : ` với sự vượt trội đáng kể so với các lựa chọn còn lại.`}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={onPrev}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default ResultsView;
