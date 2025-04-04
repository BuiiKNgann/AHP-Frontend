const RI = [0, 0, 0.58, 0.9, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49];

// Tính trọng số từ ma trận so sánh
export const calculateWeights = (matrix) => {
  const n = matrix.length;

  // Tính tổng các cột
  const columnSums = Array(n).fill(0);
  for (let col = 0; col < n; col++) {
    for (let row = 0; row < n; row++) {
      columnSums[col] += matrix[row][col];
    }
  }

  // Tính ma trận chuẩn hóa
  const normalizedMatrix = matrix.map((row, rowIndex) => {
    return row.map((cell, colIndex) => {
      return cell / columnSums[colIndex];
    });
  });

  // Tính trọng số từ ma trận chuẩn hóa
  const weights = Array(n).fill(0);
  for (let row = 0; row < n; row++) {
    let sum = 0;
    for (let col = 0; col < n; col++) {
      sum += normalizedMatrix[row][col];
    }
    weights[row] = sum / n;
  }

  return weights;
};

// Tính Consistency Ratio (CR)
export const calculateCR = (matrix, weights) => {
  const n = matrix.length;

  if (n <= 1) {
    return 0;
  }

  // Tính Weighted Sum Values
  const wsv = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      wsv[i] += matrix[i][j] * weights[j];
    }
  }

  // Tính Consistency Vector
  const cv = wsv.map((value, index) => value / weights[index]);

  // Tính Lambda Max
  const lambdaMax = cv.reduce((sum, value) => sum + value, 0) / n;

  // Tính Consistency Index (CI)
  const CI = (lambdaMax - n) / (n - 1);

  // Lấy Random Index (RI) tương ứng với số lượng tiêu chí
  const randomIndex = n <= 10 ? RI[n - 1] : 1.49;

  // Tính Consistency Ratio (CR)
  const CR = CI / randomIndex;

  return CR;
};
