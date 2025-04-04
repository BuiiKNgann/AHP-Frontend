import React from "react";

const ScaleSelector = ({ value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="p-1 border rounded w-full"
    >
      <option value="9">9 - Cực kỳ quan trọng hơn</option>
      <option value="8">8 - </option>
      <option value="7">7 - Rất quan trọng hơn</option>
      <option value="6">6 </option>
      <option value="5">5 - Quan trọng hơn</option>
      <option value="4">4 - </option>
      <option value="3">3 - Hơi quan trọng hơn</option>
      <option value="2">2 - </option>
      <option value="1">1 - Quan trọng như nhau</option>
      <option value="0.333">1/3 - Hơi kém quan trọng hơn</option>
      <option value="0.25">1/4 - Hơi kém quan trọng hơn</option>
      <option value="0.2">1/5 - Kém quan trọng hơn</option>
      <option value="0.143">1/7 - Rất kém quan trọng hơn</option>
      <option value="0.111">1/9 - Cực kỳ kém quan trọng hơn</option>
    </select>
  );
};

export default ScaleSelector;
