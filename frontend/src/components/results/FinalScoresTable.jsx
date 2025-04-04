import React from "react";

const FinalScoresTable = ({ alternatives, scores }) => {
  const scoreData = alternatives
    .map((alt, index) => ({
      alt,
      score: scores[index],
      index,
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border p-2 bg-gray-100">Đối tượng</th>
            <th className="border p-2 bg-gray-100">Điểm số</th>
            <th className="border p-2 bg-gray-100">Xếp hạng</th>
          </tr>
        </thead>
        <tbody>
          {scoreData.map((item, rank) => (
            <tr key={item.index} className={rank === 0 ? "bg-green-50" : ""}>
              <td className="border p-2">{item.alt}</td>
              <td className="border p-2 text-center">
                {item.score.toFixed(4)}
              </td>
              <td className="border p-2 text-center font-semibold">
                {rank + 1}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FinalScoresTable;
