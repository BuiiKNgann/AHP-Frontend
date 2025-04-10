import React, { useState, useEffect } from "react";
import CriteriaComparisonView from "./CriteriaComparisonView";
import AlternativesComparisonView from "./AlternativesComparisonView";
import ResultsView from "./ResultsView";
import { calculateWeights, calculateCR } from "../utils/ahpCalculations";

const AHPCalculator = () => {
  const criteria = [
    "Tổng tài sản",
    "Tỷ lệ vay/tài sản",
    "Hạng tín dụng",
    "Lịch sử vỡ nợ",
    "Độ dài lịch sử tín dụng",
    "Quyền sở hữu nhà",
  ];

  const alternatives = [
    "Khách hàng A - Vay nợ lớn nhưng khả năng thanh toán ổn định",
    "Khách hàng B - Tài sản lớn nhưng rủi ro trả nợ chậm",
    "Khách hàng C - Tỷ lệ vay/tài sản thấp, tài chính an toàn",
    "Khách hàng D - Từng vỡ nợ nhưng tài chính đang cải thiện",
  ];

  const [criteriaMatrix, setCriteriaMatrix] = useState(
    Array(criteria.length)
      .fill()
      .map(() => Array(criteria.length).fill(1))
  );

  const [alternativeMatrices, setAlternativeMatrices] = useState(
    criteria.map(() =>
      Array(alternatives.length)
        .fill()
        .map(() => Array(alternatives.length).fill(1))
    )
  );

  const [criteriaSums, setCriteriaSums] = useState(
    Array(criteria.length).fill(criteria.length)
  );

  const [criteriaWeights, setCriteriaWeights] = useState([]);
  const [alternativeWeights, setAlternativeWeights] = useState([]);
  const [finalScores, setFinalScores] = useState([]);
  const [consistencyRatio, setConsistencyRatio] = useState(0);
  const [alternativeCRs, setAlternativeCRs] = useState([]);

  const [weightedSumValues, setWeightedSumValues] = useState([]);
  const [consistencyVector, setConsistencyVector] = useState([]);
  const [lambdaMax, setLambdaMax] = useState(0);

  const [currentView, setCurrentView] = useState("criteria"); // 'criteria', 'alternatives', 'results'
  const [currentCriterion, setCurrentCriterion] = useState(0);

  useEffect(() => {
    const sums = Array(criteria.length).fill(0);
    for (let col = 0; col < criteria.length; col++) {
      for (let row = 0; row < criteria.length; row++) {
        sums[col] += criteriaMatrix[row][col];
      }
    }
    setCriteriaSums(sums);
  }, [criteriaMatrix, criteria.length]);

  const handleCriteriaMatrixChange = (rowIndex, colIndex, value) => {
    const floatValue = parseFloat(value) || 1;
    const newMatrix = [...criteriaMatrix];
    newMatrix[rowIndex][colIndex] = floatValue;
    newMatrix[colIndex][rowIndex] = 1 / floatValue;
    setCriteriaMatrix(newMatrix);
  };

  const handleAlternativeMatrixChange = (
    rowIndex,
    colIndex,
    value,
    criterionIndex
  ) => {
    const floatValue = parseFloat(value) || 1;
    const newMatrices = [...alternativeMatrices];
    newMatrices[criterionIndex][rowIndex][colIndex] = floatValue;
    newMatrices[criterionIndex][colIndex][rowIndex] = 1 / floatValue;
    setAlternativeMatrices(newMatrices);
  };

  const calculateResults = () => {
    const normalizedCriteriaMatrix = criteriaMatrix.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        return cell / criteriaSums[colIndex];
      });
    });

    const weights = Array(criteria.length).fill(0);
    for (let row = 0; row < criteria.length; row++) {
      let sum = 0;
      for (let col = 0; col < criteria.length; col++) {
        sum += normalizedCriteriaMatrix[row][col];
      }
      weights[row] = sum / criteria.length;
    }
    setCriteriaWeights(weights);

    const wsv = Array(criteria.length).fill(0);
    for (let i = 0; i < criteria.length; i++) {
      for (let j = 0; j < criteria.length; j++) {
        wsv[i] += criteriaMatrix[i][j] * weights[j];
      }
    }
    setWeightedSumValues(wsv);

    const cv = wsv.map((value, index) => value / weights[index]);
    setConsistencyVector(cv);

    const lambdaMaxValue =
      cv.reduce((sum, value) => sum + value, 0) / criteria.length;
    setLambdaMax(lambdaMaxValue);

    const cr = calculateCR(criteriaMatrix, weights);
    setConsistencyRatio(cr);

    const altWeights = alternativeMatrices.map((matrix) => {
      return calculateWeights(matrix);
    });
    setAlternativeWeights(altWeights);

    const altCRs = alternativeMatrices.map((matrix, index) => {
      const weights = calculateWeights(matrix);
      return calculateCR(matrix, weights);
    });
    setAlternativeCRs(altCRs);

    const scores = alternatives.map((alt, altIndex) => {
      let score = 0;
      for (let i = 0; i < criteria.length; i++) {
        score += altWeights[i][altIndex] * weights[i];
      }
      return score;
    });
    setFinalScores(scores);
  };

  const nextView = () => {
    if (currentView === "criteria") {
      setCurrentView("alternatives");
      setCurrentCriterion(0);
    } else if (currentView === "alternatives") {
      if (currentCriterion < criteria.length - 1) {
        setCurrentCriterion(currentCriterion + 1);
      } else {
        calculateResults();
        setCurrentView("results");
      }
    }
  };

  const prevView = () => {
    if (currentView === "results") {
      setCurrentView("alternatives");
      setCurrentCriterion(criteria.length - 1);
    } else if (currentView === "alternatives") {
      if (currentCriterion > 0) {
        setCurrentCriterion(currentCriterion - 1);
      } else {
        setCurrentView("criteria");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        AHP - Chọn khách hàng tốt nhất để cấp thẻ tín dụng
      </h1>

      {currentView === "criteria" && (
        <CriteriaComparisonView
          criteria={criteria}
          matrix={criteriaMatrix}
          columnSums={criteriaSums}
          onMatrixChange={handleCriteriaMatrixChange}
          onNext={nextView}
        />
      )}

      {currentView === "alternatives" && (
        <AlternativesComparisonView
          alternatives={alternatives}
          criteria={criteria}
          currentCriterion={currentCriterion}
          matrix={alternativeMatrices[currentCriterion]}
          onMatrixChange={(rowIndex, colIndex, value) =>
            handleAlternativeMatrixChange(
              rowIndex,
              colIndex,
              value,
              currentCriterion
            )
          }
          onNext={nextView}
          onPrev={prevView}
        />
      )}

      {currentView === "results" && (
        <ResultsView
          criteria={criteria}
          alternatives={alternatives}
          criteriaWeights={criteriaWeights}
          alternativeWeights={alternativeWeights}
          finalScores={finalScores}
          consistencyRatio={consistencyRatio}
          alternativeCRs={alternativeCRs}
          weightedSumValues={weightedSumValues}
          consistencyVector={consistencyVector}
          lambdaMax={lambdaMax}
          onPrev={prevView}
        />
      )}
    </div>
  );
};

export default AHPCalculator;
